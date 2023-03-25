import React, { useState, useEffect, useRef } from "react";
import JsonViewer from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonViewer";
import JsonReplacer from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonReplacer";
import Draggable from "react-draggable";

interface Props {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
}

export default function JsonEditorModal(props: Props) {
  const { hidden, onHiddenChange } = props;
  const [activeTab, setActiveTab] = useState('viewer');
  function handleHidePanel() {
    onHiddenChange(true);
  }
  function handleTabClick(tabName: string) {
    setActiveTab(tabName);
  }


  return (
    <Draggable handle="#jsonEditorHeaderBar">
      <div className={`jsonEditorPanel ${hidden ? 'hidden' : ''}`}>
        <div id="jsonEditorHeaderBar" className="jsonEditorHeaderBar handle">
          <label className="jsonEditorHeaderLabel">Json Edit</label>
        </div>
        <label className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</label>
        <div className="tabs jsonEditTabs">
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'viewer' ? 'tab-active' : ''}`} onClick={() => handleTabClick('viewer')}> Viewer </h1>
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'replace' ? 'tab-active' : ''}`} onClick={() => handleTabClick('replace')}> Replace </h1>
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === 'editor' ? 'tab-active' : ''}`} onClick={() => handleTabClick('editor')}> Editor </h1>
        </div>
        <div className="jsonContentContainer">
          <div className={`tabContent ${activeTab === 'viewer' ? 'active' : ''}`}>
            <JsonViewer edit={false}/>
          </div>
          <div className={`tabContent ${activeTab === 'replace' ? 'active' : ''}`}>
            <JsonReplacer/>
          </div>
          <div className={`tabContent ${activeTab === 'editor' ? 'active' : ''}`}>
            <JsonViewer edit={true}/>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
