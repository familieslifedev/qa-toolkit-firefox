import React, { useState } from "react";
import BoltFrontendTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltFrontend";
import BoltRundeck from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltRundeck";
import BoltEmissaryTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltEmissary";
import BoltJenkinsTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltJenkins";
export default function Bolt() {
	const [selectedTab, setSelectedTab] = useState("frontendTab");

	return (
		<div className="boltContainer">
			<div className="tabs boltTabList">
				<a className={`tab boltTabItem tab-bordered ${selectedTab === "frontendTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("frontendTab")}>Frontend</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === "runDeckTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("runDeckTab")}>Rundeck</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === "emissaryTab" ? "boltTabActive" : ""}`} onClick={() => setSelectedTab("emissaryTab")}>Emissary</a>
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
					<BoltJenkinsTab/>
				</div>}
				{selectedTab === "emissaryTab" && <div>
					<BoltEmissaryTab/>
				</div>}
			</div>
		</div>
	);
}