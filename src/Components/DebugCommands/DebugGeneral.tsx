import { copyFromClipboard, get2DJson, get3DJson, load2DJson, writeToClipboard } from "~Utils/Utils";
import { FeedbackContext } from "~Utils/sidebarContext";
import { useContext } from "react";
import type { Request as BackgroundRequest } from "../../Services/Background/Request";
import { RequestType } from "~Services/Background/Request";
import DebugSingleButton from "./DebugComponents/DebugSingleButtonComp";
import browser from "webextension-polyfill";

export default function DebugGeneral(): JSX.Element {
	const { setFeedbackText } = useContext(FeedbackContext);

	async function handleLoadJson() {
		let clipText = await copyFromClipboard();
		if (!clipText) {
			setFeedbackText("failed to get clipboard");
			return;
		}
		await load2DJson(clipText);
	}

	async function handleGetPlanImages(): Promise<void> {
		try {
			let clipText: string = await copyFromClipboard();
			if (!clipText) {
				return;
			}

			if (clipText.startsWith("https://feeder")) {
				const parts: string[] = clipText.split("/");
				const domain: string = parts[2]; // should output the feederURL.
				const orderNumberPart: string = parts[5]; // should output order number with all extra details.
				const orderNumberSplit: string[] = orderNumberPart.split("-");
				const orderNumber: string = orderNumberSplit[0]; // should output clean order number
				const feederPlanImageUrl: string = `https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`;

				const request: BackgroundRequest = {
					functionName: null,
					type: RequestType.OpenInNewTab,
					arguments: [feederPlanImageUrl, null]
				};
				await browser.runtime.sendMessage(request);

			} else {
				setFeedbackText("Not a valid plan link");
			}
		} catch (error) {
			setFeedbackText(error.message);
		}
	}

	async function handleGet2DJson(): Promise<void> {
		let res = await get2DJson();
		if (res) {
			let writeString: string = JSON.stringify(res, null, 3);
			await writeToClipboard(writeString);
		}
	}

	async function handleGet3DJson(): Promise<void> {
		let res = await get3DJson();
		if (res) {
			let writeString: string = JSON.stringify(res, null, 3);
			await writeToClipboard(writeString);
		}
	}

	async function handleGet2dJsonFeeder(): Promise<void> {
		const request: BackgroundRequest = {
			functionName: "get2DJson",
			type: RequestType.SavePlanJson,
			arguments: null
		};

		const response = await browser.runtime.sendMessage(request);
		if (response) await writeToClipboard(response);
	}

	return (
		<div className="DebugCompContainer">

			<button className="btn btn-xs btn-primary debugSingleButton"
					title={"Loads 2d Plan from feeder link or Json in clipboard"} onClick={handleLoadJson}>Load Plan
				Json
			</button>
			<button className="btn btn-xs btn-primary debugSingleButton"
					title={"Stores current 2d Json in s3 and writes link to clipboard"}
					onClick={handleGet2dJsonFeeder}>Get 2d Json Feeder link
			</button>
			<button className="btn btn-xs btn-primary debugSingleButton"
					title={"Gets the current plan 2d Json and write to clipboard"} onClick={handleGet2DJson}>Get 2D Json
			</button>
			<button className="btn btn-xs btn-primary debugSingleButton"
					title={"Gets the current plan 3d Json and write to clipboard"} onClick={handleGet3DJson}>Get 3D Json
			</button>
			<button className="btn btn-xs btn-primary debugSingleButton" title={"Preview Image from Feeder"}
					onClick={handleGetPlanImages}>Get Preview Image
			</button>
			<DebugSingleButton prettyName="Render Plan Images" hoverTip="Generates plan images"
							   onClickFunction="renderPlanImages" />
		</div>
	);
}