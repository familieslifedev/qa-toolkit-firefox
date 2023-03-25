import { useStorage } from "@plasmohq/storage/dist/hook";
import {regionArray, environmentArray} from "../componentArrays";
import { useContext } from "react";
import { FeedbackContext } from "~Utils/sidebarContext";
export default function BoltFrontendTab() {
  const { setFeedbackText } = useContext(FeedbackContext);
  const [environment, setEnvironment] = useStorage("frontendEnvironment");
  const [region, setRegion] = useStorage("frontendRegion");

  function handleEnvChange(event) {
    setEnvironment(event.target.value);
  }

  function handleRegionChange(event) {
    setRegion(event.target.value);
  }

  async function frontendHandleNavigate(newTab: boolean) {
    let currentUrl = `https://frontend.${environment}wrenkitchens.${region}`;
    console.log(currentUrl);
    if (newTab == true) {
      let response = await chrome.runtime.sendMessage({ type: "openInNewTab", url: currentUrl });
      if(response){
        setFeedbackText(response);
      }
    }
    else {
      let response = await chrome.runtime.sendMessage({ type: "openInCurrentTab", url: currentUrl });
      if(response){
        setFeedbackText(response);
      }
    }

  }

  return (
    <div className="frontendContainer">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Environment:</span>
        </label>
        <select onChange={handleEnvChange} value={environment} className="select select-primary select-xs select-bordered">
          {environmentArray().map(environmentArray => (
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
        <select onChange={handleRegionChange} value={region} className="select select-primary select-xs select-bordered">
          {regionArray.map(region => (
            <option key={region.Name} value={region.Code}>
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
)
}