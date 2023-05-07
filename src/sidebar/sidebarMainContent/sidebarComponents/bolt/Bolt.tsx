import React, { useState } from "react";
import BoltFrontendTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltFrontend";
import BoltSurveyorTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltPlanner";
import BoltRundeck from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltRundeck";
import BoltEmissaryTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltEmissary";
import BoltJenkinsTab from "~sidebar/sidebarMainContent/sidebarComponents/bolt/boltJenkins";
export default function Bolt() {
		enum BoltTabs {
		frontendTab,
		plannerTab,
		runDeckTab,
		emissaryTab,
		jenkinsTab
	}
	const [selectedTab, setSelectedTab] = useState(BoltTabs.frontendTab);

	return (
		<div className="boltContainer">
			<div className="tabs boltTabList">
				<a className={`tab boltTabItem tab-bordered ${selectedTab === BoltTabs.frontendTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(BoltTabs.frontendTab)}>Frontend</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === BoltTabs.plannerTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(BoltTabs.plannerTab)}>Planner</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === BoltTabs.runDeckTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(BoltTabs.runDeckTab)}>Rundeck</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === BoltTabs.emissaryTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(BoltTabs.emissaryTab)}>Emissary</a>
				<a className={`tab boltTabItem tab-bordered ${selectedTab === BoltTabs.jenkinsTab ? "boltTabActive" : ""}`} onClick={() => setSelectedTab(BoltTabs.jenkinsTab)}>Jenkins</a>
			</div>
			<div className="boltContentPanel">
				{selectedTab === BoltTabs.frontendTab && <div className="frontendContentContainer">
					<BoltFrontendTab/>
				</div>}
				{selectedTab === BoltTabs.plannerTab && <div className="frontendContentContainer">
					<BoltSurveyorTab/>
				</div>}
				{selectedTab === BoltTabs.runDeckTab && <div>
					<BoltRundeck/>
				</div>}
				{selectedTab === BoltTabs.emissaryTab && <div>
					<BoltEmissaryTab/>
				</div>}
				{selectedTab === BoltTabs.jenkinsTab && <div>
					<BoltJenkinsTab/>
				</div>}
			</div>
		</div>
	);
}