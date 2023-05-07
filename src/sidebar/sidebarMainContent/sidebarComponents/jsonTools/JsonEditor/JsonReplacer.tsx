import { useState, useRef, ReactElement } from 'react';
import { copyFromClipboard, get2DJson, load2DJson, prettyPrintJson, writeToClipboard } from "~Utils/Utils";

enum inputSide {
  left,
  right
};

const JsonReplacer = (): ReactElement => {
  const [leftJson, setLeftJson] = useState<any>(null);
  const [rightJson, setRightJson] = useState<any>(null);
  const leftInputElement = useRef(null);
  const rightInputElement = useRef(null);

  const getJsonSide = (side: inputSide) => {
    return side === inputSide.left ? leftJson : rightJson;
  }

  const handleFromClipboard = async (side: inputSide): Promise<void> => {
    try {
      const rawJson: string = await copyFromClipboard();
      if (!rawJson) return;
      
      const parsedJson = JSON.parse(rawJson);
      side === inputSide.left ? setLeftJson(parsedJson) : setRightJson(parsedJson);

    } catch (err) {
      console.error(err);

      const message: string = "Invalid JSON";
      side === inputSide.left ? setLeftJson(message) : setRightJson(message);
    }
  }

  const handleToClipboard = async (side: inputSide): Promise<void> => {
    const inputJson = await getInput(side);
    await writeToClipboard(JSON.stringify(inputJson, null, 2));
  }

  const handleReplace = async (side: inputSide): Promise<void> => {
    const leftSide: boolean = side === inputSide.left;
    const sourceJson = leftSide ? leftJson : rightJson;

    if (!sourceJson) return; // if target does not exist then we aren't too bothered

    const newJson = await mergeChangesWithInput(side, sourceJson);
    leftSide ? setLeftJson(newJson) : setRightJson(newJson);
  }

  const mergeChangesWithInput = async (side: inputSide, sourceJson): Promise<any> => {
    // we actually want input from the opposite side
    const oppositeSide = side === inputSide.left ? inputSide.right : inputSide.left
    const json = await getInput(oppositeSide);

    const newPlan = {
      ...json?.plan,
      "leadId": modifyTarget(sourceJson?.plan?.leadId, json?.plan?.leadId),
      "email": modifyTarget(sourceJson?.plan?.email, json?.plan?.email),
      "accountId": modifyTarget(sourceJson?.plan?.accountId, json?.plan?.accountId),
      "planId": modifyTarget(sourceJson?.plan?.planId, json?.plan?.planId)
    };

    const newJson = {
      ...json,
      plan: newPlan
    };

    side === inputSide.left ? setLeftJson(newJson) : setRightJson(newJson);
    return newJson;
  }

  const getInput = async (side: inputSide): Promise<any> => {
    const inputElem = side === inputSide.left ? leftInputElement.current : rightInputElement.current;
    const json = await JSON.parse(inputElem.innerText);

    return json;
  }

  const modifyTarget = (sourceValue: number | string, targetValue: number | string): number | string => {
    const result = sourceValue && (sourceValue === targetValue) ? sourceValue : targetValue;
    return result;
  }

  const handleLoadPlan = async (side: inputSide): Promise<void> => {
    await load2DJson(JSON.stringify(getJsonSide(side), null, 2));
  }

  const handleGet2dJson = async (side: inputSide): Promise<void> => {
    const json2dResult = await get2DJson();
    if (!json2dResult) return;

    side === inputSide.left ? setLeftJson(json2dResult) : setRightJson(json2dResult);
  }

  return(
    <div className="jsonReplacerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleGet2dJson(inputSide.left)}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleFromClipboard(inputSide.left)}>From Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Replace left" className="btn btn-sm" onClick={() => handleReplace(inputSide.left)}> ← </button>
          <button title="Replace right" className="btn btn-sm" onClick={() => handleReplace(inputSide.right)}> → </button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleGet2dJson(inputSide.right)}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm"  onClick={() => handleFromClipboard(inputSide.right)}>From clipboard</button>
        </div>
      </div>

      <div className="jsonReplacerContents ">
        <div className="jsonReplacerContent mockup-code">
          <pre ref={leftInputElement} contentEditable={true} spellCheck={false} dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(leftJson)}}></pre>
        </div>
        <div className="jsonReplacerContent mockup-code">
          <pre ref={rightInputElement} contentEditable={true} spellCheck={false} dangerouslySetInnerHTML={{__html: prettyPrintJson.toHtml(rightJson)}}></pre>
        </div>
      </div>

      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleLoadPlan(inputSide.left)}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(inputSide.left)}>To Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Replace left" className="btn btn-sm" onClick={() => handleReplace(inputSide.left)}> ← </button>
          <button title="Replace right" className="btn btn-sm" onClick={() => handleReplace(inputSide.right)}> → </button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleLoadPlan(inputSide.right)}>Load Json</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleToClipboard(inputSide.right)}>To Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default JsonReplacer;
