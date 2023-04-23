import { BG_savePlanJson } from "~Utils/backgroundMessageHandler";

export async function create2dJsonToFeeder() {
	chrome.contextMenus.create({
		id: 'save2dJsonFeeder',
		title: 'Save 2D JSON As Feeder',
		contexts: ['all'],
		parentId: 'parentContextMenu',
		documentUrlPatterns: [
			'https://planner2d.wrenkitchens.com/*',
			'https://planner2d.project0.wrenkitchens.com/*',
			'https://planner2d.project1.wrenkitchens.com/*',
			'https://planner2d.project2.wrenkitchens.com/*',
			'https://planner2d.project3.wrenkitchens.com/*',
			'https://planner2d.project4.wrenkitchens.com/*',
			'https://planner2d.project5.wrenkitchens.com/*',
			'https://planner2d.project6.wrenkitchens.com/*',
			'https://planner2d.project7.wrenkitchens.com/*',
			'https://planner2d.project8.wrenkitchens.com/*'
		]
	});
}


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === 'save2dJsonFeeder') {
		await BG_savePlanJson({
			type: "BG_savePlanJson",
			functionName: "get2DJson",
		});
	}


});