import React, { useState } from "react";
import DebugGeneral from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugGeneral";
export default function DebugCommands() {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="debugCommandsContainer">
      <div className="tabs debugCommandsTabList">
        <a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "generalTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("generalTab")}>General</a>
        <a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "3dtoursTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("3dtoursTab")}>3DTours</a>
        <a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "cppTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("cppTab")}>CPP</a>
      </div>
      <div className="debugCommandsContentPanel">
        {selectedTab === "generalTab" && <div className="generalContentContainer">
          <DebugGeneral/>
        </div>}
        {selectedTab === "3dtoursTab" && <div>
          3D Tours content
        </div>}
        {selectedTab === "cppTab" && <div>
          CPP content
        </div>}
      </div>
    </div>
  );
}