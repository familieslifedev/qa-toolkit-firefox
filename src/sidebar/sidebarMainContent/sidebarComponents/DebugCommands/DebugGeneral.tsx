import { copyFromClipboard, get2DJson, get3DJson, load2DJson, openURL, writeToClipboard } from "~Utils/Utils";
import {FeedbackContext} from "~Utils/sidebarContext";
import JsonEditorModal from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState } from "react";
import { openInNewTab } from "~Utils/backgroundMessageHandler";
import { injectDebugCommand } from "~Utils/Utils";
import DebugSingleButton from "./DebugComponents/DebugSingleButtonComp";

export default function DebugGeneral() {
	const { setFeedbackText } = useContext(FeedbackContext);

	async function handleLoadJson() {
		let clipText = await copyFromClipboard();
		if (!clipText) {
			setFeedbackText("failed to get clipboard");
			return;
		}
		await load2DJson(clipText);
	}

	async function handleGetPlanImages() {
		try{
			let clipText = await copyFromClipboard();
			if (!clipText) {
				return;
			}
			if(clipText.startsWith("https://feeder")) {
				const parts = clipText.split("/");
				const domain = parts[2]; // should output the feederURL.
				const orderNumberPart = parts[5]; // should output order number with all extra details.
				const orderNumberSplit = orderNumberPart.split("-");
				const orderNumber = orderNumberSplit[0]; // should output clean order number
				const feederPlanImageUrl = `https://${domain}/plan/image/get?planId=${orderNumber}&imageType=PREVIEW_IMAGE&debug=true`;
				await chrome.runtime.sendMessage({ type: "openInNewTab", url: feederPlanImageUrl });

			}
			else {
				setFeedbackText("Not a valid plan link");
			}
		}catch (error) {
			setFeedbackText(error.message);
		}}

	async function handleGet2DJson() {
		let res = await get2DJson()
		if(res){
			let writeString = JSON.stringify(res, null, 3)
			await writeToClipboard(writeString);
		}
	}

	async function handleGet3DJson() {
		let res = await get3DJson()
		if(res){
			let writeString = JSON.stringify(res, null,3)
			await writeToClipboard(writeString);
		}
	}


	async function handleGet2dJsonFeeder() {
		let command = "get2DJson"
		let response = await chrome.runtime.sendMessage({
			type: "BG_savePlanJson",
			functionName: command,
		})
		if (response){
			await writeToClipboard(response);
		}

	}

	return (

		<div className="DebugCompContainer">

			<button className="btn btn-xs btn-primary debugSingleButton" title={"Loads 2d Plan from feeder link or Json in clipboard"} onClick={handleLoadJson}>Load Plan Json</button>
			<button className="btn btn-xs btn-primary debugSingleButton" title={"Stores current 2d Json in s3 and writes link to clipboard"} onClick={handleGet2dJsonFeeder}>Get 2d Json Feeder link</button>
			<button className="btn btn-xs btn-primary debugSingleButton" title={"Gets the current plan 2d Json and write to clipboard"} onClick={handleGet2DJson}>Get 2D Json</button>
			<button className="btn btn-xs btn-primary debugSingleButton" title={"Gets the current plan 3d Json and write to clipboard"} onClick={handleGet3DJson}>Get 3D Json</button>
			<button className="btn btn-xs btn-primary debugSingleButton" title={"Preview Image from Feeder"} onClick={handleGetPlanImages}>Get Preview Image</button>
			<DebugSingleButton prettyName="Render Plan Images" title={"Generates plan images"} onClickFunction='renderPlanImages'/>
		</div>
	);
}

