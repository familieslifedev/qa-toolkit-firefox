import { useStorage } from "@plasmohq/storage/dist/hook";
import { regionArray, rundeckJobsArray } from "~Utils/componentArrays";
import { useContext } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";
import { Request as BackgroundRequest, RequestType } from "../../Services/Background/Request";
import browser from "webextension-polyfill";

export default function BoltRundeck() {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [rundeckJob, setRundeckJob] = useStorage("rundeckJob", rundeckJobsArray[0].Job);
	const [region, setRegion] = useStorage("rundeckRegion", regionArray[0].Code);

	const regionCodeToKey = {
		com: "UK",
		us: "US"
	};

	function handleEnvChange(event) {
		setRundeckJob(event.target.value).then(response => {
			console.log("BoltRundeck:handleEnvChange - Response received:", response);
		})
			.catch(error => {
				console.error("BoltRundeck:handleEnvChange - Error sending message:", error);
			});
	}

	function handleRegionChange(event) {
		setRegion(event.target.value).then(response => {
			console.log("BoltRundeck:handleRegionChange - Response received:", response);
		})
			.catch(error => {
				console.error("BoltRundeck:handleRegionChange - Error sending message:", error);
			});
	}

	async function rundeckHandleNavigate(newTab) {
		const regionKey = regionCodeToKey[region];
		const job = rundeckJobsArray.find((j) => j.Job === rundeckJob);
		const url = job[regionKey];

		const request: BackgroundRequest = {
			type: newTab ? RequestType.OpenInNewTab : RequestType.OpenInCurrentTab,
			functionName: null,
			arguments: [url]
		};

		const response = await browser.runtime.sendMessage(request);
		if (response) {
			setFeedbackText(response);
		}
	}

	return (
		<div className="frontendContainer">
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Job:</span>
				</label>
				<select onChange={handleEnvChange} value={rundeckJob}
						className="select select-primary select-xs select-bordered">
					{rundeckJobsArray.map(rundeckJobs => (
						<option key={rundeckJobs.Job} value={rundeckJobs.Job}>
							{rundeckJobs.Name}
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
						<option key={region.Code} value={region.Code}>
							{region.Name}
						</option>
					))}
				</select>
			</div>
			<div className="btn-group m-5">
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => rundeckHandleNavigate(true)}>New Tab
				</button>
				<button className="btn btn-xs grp-btn btn-primary" onClick={() => rundeckHandleNavigate(false)}>Current
					Tab
				</button>
			</div>
		</div>
	);
}
