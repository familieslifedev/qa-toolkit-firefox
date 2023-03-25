import React, { useState } from "react";
import { copyFromClipboard, get2DJson, get3DJson, load2DJson, prettyPrintJson, writeToClipboard } from "~Utils/Utils";




const JsonViewer = ({ edit }) => {
  const [jsonData, setJsonData] = useState(null);
  const [updatedJson, setUpdatedJson] = useState(null);


  const handleGet2dJson = async () => {
    let res = await get2DJson()
    if (res) {
      setJsonData(res);
      setUpdatedJson(null);
    }
  }
  const handleGet3dJson = async () => {
    let res = await get3DJson()
    if(res){
      setJsonData(res);
      setUpdatedJson(null);
    }
  }
  const handleFromClipboard = async () => {
    try {
      const res = await copyFromClipboard()
      if (res) {
        setJsonData(JSON.parse(res));
        setUpdatedJson(null);
      }
    } catch (error) {
      setJsonData("Invalid Json");
    }
  }

  function handleJsonValidate() {
    let jsonToValidate = updatedJson !== null ? updatedJson : jsonData;

    try {
      if (jsonToValidate) {
        let parsedJson = JSON.parse(typeof jsonToValidate === 'string' ? jsonToValidate : JSON.stringify(jsonToValidate));
        alert('JSON is valid!');
      } else {
        alert('Please enter some JSON first');
      }
    } catch (error) {
      alert('Invalid JSON');
    }
  }



  const handleEditJson = (e) => {
    const newJsonData = e.target.innerText;
    setUpdatedJson(newJsonData);
  }

  async function handleToClipboard() {
    if(updatedJson) {
      await writeToClipboard(updatedJson);
    } else {
      await writeToClipboard(JSON.stringify(jsonData,null,2));
    }
  }

  async function handleLoadPlan() {
    if (updatedJson) {
      await load2DJson(updatedJson);
    } else {
      await load2DJson(JSON.stringify(jsonData));
    }
  }

  return (
    <div className="jsonViewerContainer">
      <div className="jsonReplacerHeader">
        <div className="btn-group">
          <button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleGet2dJson}>Get 2D</button>
          <button title="Get the current pages 3d Json" className="btn btn-sm" onClick={handleGet3dJson}>Get 3D</button>
          <button title="Get Json from feeder link or a direct json" className="btn btn-sm" onClick={handleFromClipboard}>From Clipboard</button>
        </div>
      </div>
      <div className="jsonViewerContent mockup-code">
        {jsonData && (
          <pre spellCheck={false} contentEditable={edit} dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(jsonData) }}
               onInput={handleEditJson} >
          </pre>

        )}
      </div>
      <div className="jsonReplacerHeader">
        <div className="btn-group">
          <button title="Validate the Json to ensure the integrity" className="btn btn-sm" onClick={handleJsonValidate}>Validate</button>
          <button title="Load the displayed 2d plan in planner" className="btn btn-sm" onClick={handleLoadPlan}>Load Plan</button>
          <button title="Write the currently displayed json to the clipboard" className="btn btn-sm" onClick={handleToClipboard}>To Clipboard</button>
        </div>
      </div>
    </div>
  );
}

export default JsonViewer;
