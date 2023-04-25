import React, { useState } from "react";
import DebugGeneral from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugGeneral";
import DebugCPP from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugCPP";
import Debug3dTours from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/Debug3dTours";
import DebugSingleButton
	from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugComponents/DebugSingleButtonComp";
import DebugRoom from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugRoom";
export default function DebugCommands() {
	enum Tabs {
		generalTab,
		cppTab,
		roomTab,
		toursTab

	}
	const [selectedTab, setSelectedTab] = useState(Tabs.generalTab);

	return (
		<>
		<div className="debugCommandsContainer">
			<div className="tabs debugCommandsTabList">
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === Tabs.generalTab ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.generalTab)}>General</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === Tabs.cppTab ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.cppTab)}>CPP</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === Tabs.roomTab ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.roomTab)}>Room</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === Tabs.toursTab ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab(Tabs.toursTab)}>3DTours</a>
			</div>
			<div className="debugCommandsContentPanel">
				{selectedTab === Tabs.generalTab && <div className="generalContentContainer">
					<DebugGeneral/>
				</div>}
				{selectedTab === Tabs.cppTab && <div>
					<DebugCPP/>
				</div>}
				{selectedTab === Tabs.roomTab && <div>
					<DebugRoom/>
				</div>}
				{selectedTab === Tabs.toursTab && <div>
					<Debug3dTours/>
				</div>}
			</div>

		</div>
	<DebugSingleButton prettyName="Clear All" onClickFunction='debugClear'/>
	</>
	);
}