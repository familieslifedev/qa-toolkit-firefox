import { useStorage } from "@plasmohq/storage/dist/hook";
import { regionArray, environmentArray, jenkinsJobsArray } from "../componentArrays";
import { useContext } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";

export default function BoltJenkinsTab() {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [environment, setEnvironment] = useStorage("jenkinsEnvironment", environmentArray[0].Code);
	const [region, setRegion] = useStorage("jenkinsRegion", regionArray[0].Jenkins);
	const [jenkinsJob, setJenkinsJob] = useStorage("jeknkinsJob", jenkinsJobsArray[0].Job);

	function handleEnvChange(event) {
		setEnvironment(event.target.value);
	}

	function handleEmissaryJobChange(event) {
		setJenkinsJob(event.target.value);
	}

	function handleRegionChange(event) {
		setRegion(event.target.value);
	}
	async function frontendHandleNavigate(newTab: boolean) {
		const finalEnvironment = environment.trim() === "" ? "master" : environment.trim();
		const currentUrl = `https://jenkins.wrenkitchens.com/job/${jenkinsJob}/job/${region}/job/${finalEnvironment.trim()}/`;

		if (newTab == true) {
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
		<div className="frontendContainer">
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Job:</span>
				</label>
				<select onChange={handleEmissaryJobChange} value={jenkinsJob} className="select select-primary select-xs select-bordered">
					{jenkinsJobsArray.map(jenkinsJob => (
						<option key={jenkinsJob.Job} value={jenkinsJob.Job}>
							{jenkinsJob.Name}
						</option>
					))}
				</select>
				<label className="label">
					<span className="label-text">Environment:</span>
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
						<option key={region.Name} value={region.Jenkins}>
							{region.Name}
						</option>
					))}
				</select>
			</div>
			<div className="btn-group m-5">
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => frontendHandleNavigate(true)}>New Tab</button>
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => frontendHandleNavigate(false)}>Current Tab</button>
			</div>
		</div>
	);
}
