import React, { useState } from 'react';
import { copyFromClipboard, get2DJson, load2DJson, prettyPrintJson, writeToClipboard } from "~Utils/Utils";
const JsonReplacer = () => {
  const [leftJson, setLeftJson] = useState(null);
  const [rightJson, setRightJson] = useState(null);
  const [updatedLeftJson, setUpdatedLeftJson] = useState( null);
  const [updatedRightJson, setUpdatedRightJson] = useState( null);


  const handleFromClipboard = async (isLeft) => {
    try {
      let res = await copyFromClipboard();
      if (res) {
        let parsed = JSON.parse(res);
        if (isLeft) {
          setLeftJson(parsed);
          setUpdatedLeftJson(null);
        }
        else {
          setRightJson(parsed);
          setUpdatedRightJson(null);
        }
      }
    }
    catch (error) {
      if (isLeft){
        setLeftJson("Invalid Json");
      }
      else{
        setRightJson("Invalid Json");
      }
    }
  }

  const handleToClipboard = async (isLeft) => {
    if (isLeft) {
      if (updatedLeftJson) {
        await writeToClipboard(updatedLeftJson);
      } else {
        await writeToClipboard(JSON.stringify(leftJson, null, 2));
      } 
    } else {
      if (updatedLeftJson) {
        await writeToClipboard(updatedRightJson);
      } else {
        await writeToClipboard(JSON.stringify(rightJson, null, 2));
      }
    }
  }

  function handleReplaceLeft() {
    if (leftJson && rightJson) {
      const newPlan = {
        ...leftJson.plan,
        leadId: JSON.parse(updatedRightJson)?.plan.leadId ?? rightJson.plan.leadId,
        email: JSON.parse(updatedRightJson)?.plan.email ?? rightJson.plan.email,
        accountId: JSON.parse(updatedRightJson)?.plan.accountId ?? rightJson.plan.accountId,
        planId: JSON.parse(updatedRightJson)?.plan.planId ?? rightJson.plan.planId
      };
      const newLeftJson = {
        ...leftJson,
        plan: newPlan
      };
      setLeftJson(newLeftJson);
    }
  }


  function handleReplaceRight() {
    if (leftJson && rightJson) {
      const updatedPlan = {
        ...rightJson.plan,
        leadId: JSON.parse(updatedLeftJson)?.plan?.leadId ?? leftJson.plan.leadId,
        email: JSON.parse(updatedLeftJson)?.plan?.email ?? leftJson.plan.email,
        accountId: JSON.parse(updatedLeftJson)?.plan?.accountId ?? leftJson.plan.accountId,
        planId: JSON.parse(updatedLeftJson)?.plan?.planId ?? leftJson.plan.planId
      };
      const newRightJson = {
        ...rightJson,
        plan: updatedPlan
      };
      setRightJson(newRightJson);
    }
  }


  const handleEditJson = (e, isLeft) => {
     if (isLeft) {
       const newJsonData = e.target.innerText;
       setUpdatedLeftJson(newJsonData);
     }
      else {
       const newJsonData = e.target.innerText;
       setUpdatedRightJson(newJsonData);
     }
  }

  async function handleLoadPlan(isLeft) {
    if (isLeft) {
      if (updatedLeftJson) {
        await load2DJson(updatedLeftJson);
      } else {
        await load2DJson(JSON.stringify(leftJson));
      }
    }
    else {
      if (updatedRightJson) {
        await load2DJson(updatedRightJson);
      } else {
        await load2DJson(JSON.stringify(rightJson));
      }
    }
  }

  const handleGet2dJson = async (isLeft) => {
    let res = await get2DJson()
    if (res) {
      if(isLeft){
        setLeftJson(res)
        setUpdatedLeftJson(null);
      }
      else {
        setRightJson(res)
        setUpdatedRightJson(null);
      }
    }
  }

  return(
    <div className="jsonReplacerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group grp-left">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={() => handleGet2dJson(true)}>Get 2D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={() => handleFromClipboard(true)}>From Clipboard</button>
        </div>
        <div className="btn-group grp-right">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleReplaceLeft}> ← </button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleReplaceRight}> → </button>
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
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleReplaceLeft}> ← </button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleReplaceRight}> → </button>
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
