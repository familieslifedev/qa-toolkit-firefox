import { useStorage } from "@plasmohq/storage/dist/hook";
import { regionArray, environmentArray, roomTypeArray } from "~Utils/componentArrays";
import { useContext, useState } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";
import { Request as BackgroundRequest, RequestType } from "../../Services/Background/Request";
import browser from "webextension-polyfill";

export default function BoltSurveyorTab(): JSX.Element {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [environment, setEnvironment] = useStorage("plannerEnvironment", environmentArray[0].Code);
	const [region, setRegion] = useStorage("plannerRegion", regionArray[0].Code);
	const [roomType, setRoomType] = useStorage("plannerRoomType", roomTypeArray[0].Code);
	const [isPlannerToggle, setIsPlannerToggle] = useState(false);

	function handleEnvChange(event) {
		setEnvironment(event.target.value);
	}

	function handleRegionChange(event) {
		setRegion(event.target.value);
	}

	function handleRoomTypeChange(event) {
		setRoomType(event.target.value);
	}

	function toggleEnv(event) {
		setIsPlannerToggle(currentToggle => event.target.checked);
	}

	async function plannerHandleNavigate(newTab: boolean) {
		const envCode = environment ? `${environment.trim()}.` : "";
		let currentUrl = isPlannerToggle
			? `https://planner2d.${envCode}wrenkitchens.${region.trim()}/surveyor`
			: `https://planner2d.${envCode}wrenkitchens.${region.trim()}/showroom/${roomType}?debug&features=planner-specialist-worktops-add-feature-removal,new-room-profile&planUrl=`;
		console.log(currentUrl);

		const request: BackgroundRequest = {
			type: newTab ? RequestType.OpenInNewTab : RequestType.OpenInCurrentTab,
			functionName: null,
			arguments: [currentUrl]
		};

		const response = await browser.runtime.sendMessage(request);
		if (response) {
			setFeedbackText(response);
		}
	}

	return (
		<div className="plannerContainer">
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">{isPlannerToggle ? "Surveyor:" : "Showroom:"}</span>
					<input type="checkbox" className="toggle toggle-xs toggle-primary"
						   onClick={(event) => toggleEnv(event)}></input>
				</label>
				<select onChange={handleEnvChange} value={environment}
						className="select select-primary select-xs select-bordered">
					{environmentArray.map(environmentArray => (
						<option key={environmentArray.Name} value={environmentArray.Code}>
							{environmentArray.Name}
						</option>
					))}
				</select>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Region:</span>
				</label>
				<select onChange={handleRegionChange} value={region}
						className="select select-primary select-xs select-bordered">
					{regionArray.map(region => (
						<option key={region.Name} value={region.Code}>
							{region.Name}
						</option>
					))}
				</select>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">PlannerRoomType:</span>
				</label>
				<select onChange={handleRoomTypeChange} value={roomType}
						className="select select-primary select-xs select-bordered">
					{roomTypeArray.map(roomType => (
						<option key={roomType.Name} value={roomType.Code}>
							{roomType.Name}
						</option>
					))}
				</select>
			</div>
			<div className="btn-group m-5">
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => plannerHandleNavigate(true)}>New Tab
				</button>
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => plannerHandleNavigate(false)}>Current
					Tab
				</button>
			</div>
		</div>
	);
}
