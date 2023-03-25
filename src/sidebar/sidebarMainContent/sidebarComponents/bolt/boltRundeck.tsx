import { useStorage } from "@plasmohq/storage/dist/hook";
import {regionArray, environmentArray} from "../componentArrays";
import { useContext } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";
import {rundeckJobsArray} from "./rundeckJobs";
export default function BoltRundeck() {
  const { setFeedbackText } = useContext(FeedbackContext);
  const [rundeckJob, setRundeckJob] = useStorage("frontendEnvironment");
  const [region, setRegion] = useStorage("rundeckRegion");

  function handleEnvChange(event) {
    setRundeckJob(event.target.value);
  }

  function handleRegionChange(event) {
    setRegion(event.target.value);
  }

  async function rundeckHandleNavigate(newTab: boolean) {
    const job = rundeckJobsArray.find((j) => j.Job === rundeckJob);
    const url = job[region];
    if (newTab) {
      let response = await chrome.runtime.sendMessage({ type: "openInNewTab", url: url });
      if (response) {
        setFeedbackText(response);
      }
    } else {
      let response = await chrome.runtime.sendMessage({ type: "openInCurrentTab", url: url });
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
        <select onChange={handleEnvChange} value={rundeckJob} className="select select-primary select-xs select-bordered">
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
        <select onChange={handleRegionChange} value={region} className="select select-primary select-xs select-bordered">
          {regionArray.map(region => (
            <option key={region.Name} value={region.Name}>
              {region.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="btn-group m-5">
        <button className="btn btn-xs grp-btn btn-primary" onClick={() => rundeckHandleNavigate(true)}>New Tab</button>
        <button className="btn btn-xs grp-btn btn-primary" onClick={() => rundeckHandleNavigate(false)}>Current Tab</button>
      </div>
    </div>
)
}