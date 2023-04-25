import React, { useState } from "react";
import BoltFrontendTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltFrontend";
import BoltRundeck from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltRundeck";
import BoltEmissaryTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltEmissary";
import BoltJenkinsTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltJenkins";
export default function Bolt() {
		enum Tabs {
		frontendTab,
		runDeckTab,
		emissaryTab,
		jenkinsTab
	}
	const [selectedTab, setSelectedTab] = useState(Tabs.frontendTab);

	return (
		<div className="boltContainer">
			<div className="tabs boltTabList">
				<a className={`tab boltTabItem tab-bordered ${selectedTab === Tabs.frontendTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.frontendTab)}>Frontend</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === Tabs.runDeckTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.runDeckTab)}>Rundeck</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === Tabs.emissaryTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.emissaryTab)}>Emissary</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === Tabs.jenkinsTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.jenkinsTab)}>Jenkins</a>
			</div>
			<div className="boltContentPanel">
				{selectedTab === Tabs.frontendTab && <div className="frontendContentContainer">
					<BoltFrontendTab/>
				</div>}
				{selectedTab === Tabs.runDeckTab && <div>
					<BoltRundeck/>
				</div>}
				{selectedTab === Tabs.emissaryTab && <div>
					<BoltEmissaryTab/>
				</div>}
				{selectedTab === Tabs.jenkinsTab && <div>
					<BoltJenkinsTab/>
				</div>}
			</div>
		</div>
	);
}