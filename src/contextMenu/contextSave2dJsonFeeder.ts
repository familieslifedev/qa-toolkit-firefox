import { ContentRequest, ContentRequestType } from "../ContentService/Request";
import { sendJsonToFeeder } from "../Utils/JsonHelper";
import { executeBackground } from "../Utils/scripts";

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
		const tab = await chrome.tabs.query({active: true, currentWindow: true});
		const currentTab = tab[0];
		const currentTabUrl = currentTab.url;

		const json = await executeBackground(currentTab, "get2DJson");

		const planId = json[0].result.plan.planId;
		const urlText = await sendJsonToFeeder(json[0].result, planId, currentTabUrl);

		const clipboardRequest: ContentRequest = {
			type: ContentRequestType.WriteToClipboard,
			arguments: [urlText],
			functionName: null
		};
		await chrome.tabs.sendMessage(currentTab.id, clipboardRequest);
	}
});
