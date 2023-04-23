import React, { useState } from "react";
import DebugGeneral from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugGeneral";
import DebugCPP from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugCPP";
import Debug3dTours from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/Debug3dTours";
import DebugSingleButton
	from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugComponents/DebugSingleButtonComp";
import DebugRoom from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugRoom";
export default function DebugCommands() {
	const [selectedTab, setSelectedTab] = useState("generalTab");

	return (
		<>
		<div className="debugCommandsContainer">
			<div className="tabs debugCommandsTabList">
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "generalTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("generalTab")}>General</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "cppTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("cppTab")}>CPP</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "roomTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("roomTab")}>Room</a>
				<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === "3dToursTab" ? "debugCommandsTabActive" : ""}`} onClick={() => setSelectedTab("3dToursTab")}>3DTours</a>
			</div>
			<div className="debugCommandsContentPanel">
				{selectedTab === "generalTab" && <div className="generalContentContainer">
					<DebugGeneral/>
				</div>}
				{selectedTab === "3dToursTab" && <div>
					<Debug3dTours/>
				</div>}
				{selectedTab === "cppTab" && <div>
					<DebugCPP/>
				</div>}
				{selectedTab === "roomTab" && <div>
					<DebugRoom/>
				</div>}

			</div>

		</div>
	<DebugSingleButton prettyName="Clear All" onClickFunction='debugClear'/>
	</>
	);
}