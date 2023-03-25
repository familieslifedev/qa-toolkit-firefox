import React, { useState } from "react";
import BoltFrontendTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltFrontend";
import BoltRundeck from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltRundeck";
export default function Bolt() {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="boltContainer">
      <div className="tabs boltTabList">
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "frontendTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("frontendTab")}>Frontend</a>
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "runDeckTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("runDeckTab")}>Rundeck</a>
        <a className={`tab boltTabItem tab-bordered ${selectedTab === "jenkinsTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("jenkinsTab")}>Jenkins</a>
      </div>
      <div className="boltContentPanel">
        {selectedTab === "frontendTab" && <div className="frontendContentContainer">
          <BoltFrontendTab/>
        </div>}
        {selectedTab === "runDeckTab" && <div>
          <BoltRundeck/>
        </div>}
        {selectedTab === "jenkinsTab" && <div>
          Jenkins content
        </div>}
      </div>
    </div>
  );
}