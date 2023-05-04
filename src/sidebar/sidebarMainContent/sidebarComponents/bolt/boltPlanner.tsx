import { useStorage } from "@plasmohq/storage/dist/hook";
import { regionArray, environmentArray } from "../componentArrays";
import { useContext, useState } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";

export default function BoltSurveyorTab() {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [environment, setEnvironment] = useStorage("plannerEnvironment", environmentArray[0].Code);
	const [region, setRegion] = useStorage("plannerRegion", regionArray[0].Code);
    const [isPlannerToggle, setIsPlannerToggle] = useState(false)

	function handleEnvChange(event) {
		setEnvironment(event.target.value);
	}

	function handleRegionChange(event) {
		setRegion(event.target.value);
	}

    function toggleEnv(event) {
        setIsPlannerToggle(currentToggle => event.target.checked)
    }

	async function plannerHandleNavigate(newTab: boolean) {
		const envCode = environment ? `${environment.trim()}.` : "";
        let currentUrl = isPlannerToggle ? `https://planner2d.${envCode}wrenkitchens.${region.trim()}/surveyor` : `https://planner2d.${envCode}wrenkitchens.${region.trim()}/showroom/kitchen?debug&features=planner-specialist-worktops-add-feature-removal,new-room-profile&planUrl=`;
		console.log(currentUrl);

		if (newTab) {
			let response = await chrome.runtime.sendMessage({ type: "openInNewTab", url: currentUrl });
			if (response) {
				setFeedbackText(response);
			}
		} else {
			let response = await chrome.runtime.sendMessage({ type: "openInCurrentTab", url: currentUrl });
			if (response) {
				setFeedbackText(response);
			}
		}
	}

	return (
		<div className="plannerContainer">
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">{isPlannerToggle ? "Surveyor:" : "Showroom:"}</span>
                	<input type="checkbox" className="toggle toggle-xs toggle-primary" onClick={(event) => toggleEnv(event)}></input>
                </label>
				<select onChange={handleEnvChange} value={environment}  className="select select-primary select-xs select-bordered">
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
				<select onChange={handleRegionChange} value={region}  className="select select-primary select-xs select-bordered">
					{regionArray.map(region => (
						<option key={region.Name} value={region.Code}>
							{region.Name}
						</option>
					))}
				</select>
			</div>
			<div className="btn-group m-5">
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => plannerHandleNavigate(true)}>New Tab</button>
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => plannerHandleNavigate(false)}>Current Tab</button>
			</div>
		</div>
	);
}
