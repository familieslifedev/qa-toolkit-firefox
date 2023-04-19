import { copyFromClipboard, get2DJson, get3DJson, load2DJson, openURL, writeToClipboard } from "~Utils/Utils";
import {FeedbackContext} from "~Utils/sidebarContext";
import JsonEditorModal from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState } from "react";
import { openInNewTab } from "~Utils/backgroundMessageHandler";

export default function JsonTools() {
  const { setFeedbackText } = useContext(FeedbackContext);
  const [isJsonEditorVisible, setIsJsonEditorVisible] = useState(false);

  //Stop Planner consuming all inputs and take priority when the editor is open.
  useEffect(() => {
    function handleKeyDown(event) {
      if (isJsonEditorVisible) {
        event.stopPropagation();
      } else {
        // Allow the event to propagate to other event listeners
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJsonEditorVisible]);





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



  function handleJsonEditorPanel() {
    setIsJsonEditorVisible(!isJsonEditorVisible);

  }

  return (

    <div className="jsonContainer">

      <button className="btn btn-sm btn-wide btn-primary" title={"Loads 2d Plan from feeder link or Json in clipboard"} onClick={handleLoadJson}>Load Plan Json</button>
      <button className="btn btn-sm btn-wide btn-primary" title={"Stores current 2d Json in s3 and writes link to clipboard"} onClick={handleGet2dJsonFeeder}>Get 2d Json Feeder link</button>
      <button className="btn btn-sm btn-wide btn-primary" title={"Gets the current plan 2d Json and write to clipboard"} onClick={handleGet2DJson}>Get 2D Json</button>
      <button className="btn btn-sm btn-wide btn-primary" title={"Gets the current plan 3d Json and write to clipboard"} onClick={handleGet3DJson}>Get 3D Json</button>
      <button className="btn btn-sm btn-wide btn-primary" title={"Preview Image from Feeder URL"} onClick={handleGetPlanImages}>Get Plan Images</button>
      <button className="btn btn-sm btn-wide btn-primary" title={"Open Json Viewer/Editor"} onClick={handleJsonEditorPanel}>Open Json Edit</button>
      <div>
          <JsonEditorModal hidden={!isJsonEditorVisible} onHiddenChange={handleJsonEditorPanel}/>
      </div>

    </div>
  );
}

