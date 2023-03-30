import React, { useState, ReactElement } from 'react';
import { copyFromClipboard, get2DJson, load2DJson, prettyPrintJson, writeToClipboard } from "~Utils/Utils";

const JsonReplacer = (): ReactElement => {
  const [leftJson, setLeftJson] = useState(null);
  const [rightJson, setRightJson] = useState(null);
  const [updatedLeftJson, setUpdatedLeftJson] = useState( null);
  const [updatedRightJson, setUpdatedRightJson] = useState( null);

  const handleFromClipboard = async (isLeft: Boolean): Promise<void> => {
    try {
      let res = await copyFromClipboard();
      if (!res) return;
      
      let parsed = JSON.parse(res);

      if (isLeft) {
        setLeftJson(parsed);
        setUpdatedLeftJson(null);
        return;
      }

      setRightJson(parsed);
      setUpdatedRightJson(null);

    } catch (error) {
      isLeft ? setLeftJson("Invalid JSON") : setRightJson("Invalid JSON");
    }
  }

  const handleToClipboard = async (isLeft: Boolean): Promise<void> => {
    const updatedJson = isLeft ? updatedLeftJson : updatedRightJson;
    await writeToClipboard(updatedJson || JSON.stringify(isLeft ? leftJson : rightJson, null, 2));
  }

  const handleReplace = (setJsonFunc: any, targetJson: any, sourceJson: any, updatedJson: any): void => {
    if (!targetJson || !sourceJson) return;

    const parsedJson = JSON.parse(updatedJson);

    const newPlan = {
      ...targetJson.plan,
      leadId: parsedJson?.plan?.leadId ?? sourceJson?.plan?.leadId,
      email: parsedJson?.plan?.email ?? sourceJson?.plan?.email,
      accountId: parsedJson?.plan?.accountId ?? sourceJson?.plan?.accountId,
      planId: parsedJson?.plan?.planId ?? sourceJson?.plan?.planId
    };

    const newJson = {
      ...targetJson,
      plan: newPlan
    };

    setJsonFunc(newJson);
  }

  // TODO - check which event type
  const handleEditJson = (e, isLeft: Boolean): void => {
    isLeft ? setUpdatedLeftJson(e.target.innerText) : setUpdatedRightJson(e.target.innerText);
  }

  const handleLoadPlan = async (isLeft: Boolean): Promise<void> => {
    const updatedJson = isLeft ? updatedLeftJson : updatedRightJson;
    await load2DJson(updatedJson || JSON.stringify(isLeft ? leftJson : rightJson, null, 2));
  }

  const handleGet2dJson = async (isLeft: Boolean): Promise<void> => {
    const res = await get2DJson();
    if (!res) return;

    isLeft ? setLeftJson(res) : setRightJson(res);
    isLeft ? setUpdatedLeftJson(res) : setUpdatedRightJson(res);
  }

  return(
    <div className="jsonReplacerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleGet2dJson(true)}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleFromClipboard(true)}>From Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleReplace(setLeftJson, leftJson, rightJson, updatedRightJson)}> ← </button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleReplace(setRightJson, rightJson, leftJson, updatedLeftJson)}> → </button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleGet2dJson(false)}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm"  onClick={() => handleFromClipboard(false)}>From clipboard</button>
        </div>
      </div>
      <div className="jsonReplacerContents ">
        <div className="jsonReplacerContent mockup-code">
          <pre contentEditable={true} spellCheck={false} onInput={(e) => handleEditJson(e, true)}  dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(leftJson)}}></pre>
        </div>
        <div className="jsonReplacerContent mockup-code">
          <pre contentEditable={true} spellCheck={false} onInput={(e) => handleEditJson(e, false)} dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(rightJson)}}></pre>
        </div>
      </div>
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleLoadPlan(true)}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(true)}>To Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleReplace(setLeftJson, leftJson, rightJson, updatedRightJson)}> ← </button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleReplace(setRightJson, rightJson, leftJson, updatedLeftJson)}> → </button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleLoadPlan(false)}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(false)}>To Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default JsonReplacer;
