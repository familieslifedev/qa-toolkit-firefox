import React, { useState } from "react";
import DebugGeneral from "~Components/DebugCommands/DebugGeneral";
import DebugCPP from "~Components/DebugCommands/DebugCPP";
import Debug3dTours from "~Components/DebugCommands/Debug3dTours";
import DebugSingleButton
	from "~Components/DebugCommands/DebugComponents/DebugSingleButtonComp";
import DebugRoom from "~Components/DebugCommands/DebugRoom";

export default function DebugCommands() {
	enum DebugTabs {
		generalTab,
		cppTab,
		roomTab,
		toursTab

	}

	const [selectedTab, setSelectedTab] = useState(DebugTabs.generalTab);

	return (
		<>
			<div className="debugCommandsContainer">
				<div className="tabs debugCommandsTabList">
					<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === DebugTabs.generalTab ? "debugCommandsTabActive" : ""}`}
					   onClick={() => setSelectedTab(DebugTabs.generalTab)}>General</a>
					<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === DebugTabs.cppTab ? "debugCommandsTabActive" : ""}`}
					   onClick={() => setSelectedTab(DebugTabs.cppTab)}>CPP</a>
					<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === DebugTabs.roomTab ? "debugCommandsTabActive" : ""}`}
					   onClick={() => setSelectedTab(DebugTabs.roomTab)}>Room</a>
					<a className={`tab debugCommandsTabItem tab-bordered ${selectedTab === DebugTabs.toursTab ? "debugCommandsTabActive" : ""}`}
					   onClick={() => setSelectedTab(DebugTabs.toursTab)}>3DTours</a>
				</div>
				<div className="debugCommandsContentPanel">
					{selectedTab === DebugTabs.generalTab && <div className="generalContentContainer">
						<DebugGeneral />
					</div>}
					{selectedTab === DebugTabs.cppTab && <div>
						<DebugCPP />
					</div>}
					{selectedTab === DebugTabs.roomTab && <div>
						<DebugRoom />
					</div>}
					{selectedTab === DebugTabs.toursTab && <div>
						<Debug3dTours />
					</div>}
				</div>

			</div>
			<DebugSingleButton prettyName="Clear All" onClickFunction="debugClear" />
		</>
	);
}