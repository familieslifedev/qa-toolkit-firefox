import * as utils from "./Utils"
import {commandMap} from "./consoleCommandMap"

export const openInNewTab = (async (request, sender, sendResponse) => {
	try {
		await utils.openURL(request.url, request.tabId, true)
	} catch (error) {
		sendResponse(error.message)
	}
})
export const openInCurrentTab = (async (request, sender, sendResponse) => {
	try {
		await utils.openURL(request.url, request.tabId, false)
	} catch (error) {
		sendResponse(error.message)
	}
})
export const openOptionsPage = (request, sender, sendResponse) => {
	chrome.runtime.openOptionsPage();
}

export const BG_injectConsoleCommand = async (request, sender, sendResponse) => {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let currentTab = await chrome.tabs.query(queryOptions);
	let currentTabId = currentTab[0].id;
	let functionToCall = commandMap.get(request.functionName)
	await chrome.scripting.executeScript({
		target: { tabId: currentTabId },
		world: chrome.scripting.ExecutionWorld.MAIN,
		args: request.arguments,
		func: functionToCall,
	})
};

export const BG_get2DJson = async (request, sender, sendResponse) => {
	try {  let queryOptions = { active: true, lastFocusedWindow: true };
		let currentTab = await chrome.tabs.query(queryOptions);
		let currentTabId = currentTab[0].id;
		let functionToCall = commandMap.get(request.functionName)
		let outerResult = await chrome.scripting.executeScript({
			target: { tabId: currentTabId },
			world: chrome.scripting.ExecutionWorld.MAIN,
			args: request.arguments,
			func: functionToCall,
		});
		if (!outerResult) {
			sendResponse({error:"Missing 2d Json Result"})
			throw new Error("Missing 2d JSON result")
		}
		sendResponse(outerResult[0].result);
	} catch(err) {
		console.error(err);
	}
};

export const BG_get3DJson = async (request, sender, sendResponse) => {
	try {  let queryOptions = { active: true, lastFocusedWindow: true };
		let currentTab = await chrome.tabs.query(queryOptions);
		let currentTabId = currentTab[0].id;
		let functionToCall = commandMap.get(request.functionName)
		let outerResult = await chrome.scripting.executeScript({
			target: { tabId: currentTabId },
			world: chrome.scripting.ExecutionWorld.MAIN,
			args: request.arguments,
			func: functionToCall,
		});
		if (!outerResult) {
			sendResponse({error:"Missing 3d Json Result"})
			throw new Error("Missing 3d JSON result")
		}
		sendResponse(outerResult[0].result);
	} catch(err) {
		console.error(err);
	}
};

export const BG_savePlanJson = async (request, sender, sendResponse) => {
	try {  let queryOptions = { active: true, lastFocusedWindow: true };
		const currentTab = await chrome.tabs.query(queryOptions);
		const currentTabId = currentTab[0].id;
		const currentTabUrl = currentTab[0].url;
		const functionToCall = commandMap.get(request.functionName)
		const outerResult = await chrome.scripting.executeScript({
			target: { tabId: currentTabId },
			world: chrome.scripting.ExecutionWorld.MAIN,
			args: request.arguments,
			func: functionToCall,
		});
		if (!outerResult) {
			sendResponse({error:"Missing 2d Json Result"})
			throw new Error("Missing 2d JSON result")
		}
		const currentProject = currentTabUrl.match(/(\.project[0-9])/)?.[0] || '';
		const url = `https://feeder${currentProject}.wrenkitchens.com/plan/save-plan-json`;
		const headers = {
			"accept": "application/json, text/plain, */*",
			"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
			"content-type": "application/x-www-form-urlencoded",
		};
		const planId= outerResult[0].result.plan.planId;
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // +1 as months are zero-indexed
		const day = now.getDate();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();
		const filename = `${planId}-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;
		const planJson =  JSON.stringify(outerResult[0].result);
		const body = `filename=${filename}&planJson=${encodeURIComponent(planJson)}`;
		const method = "POST";
	
		let storeJson = await fetch(url, {
			headers: headers,
			method: method,
			body: body
		})
		if(storeJson.ok) {
			let textToWrite = `https://feeder${currentProject}.wrenkitchens.com/plan/read-plan-json/${filename}`;
			const tab = await chrome.tabs.query({active: true, currentWindow: true});
			const currentTab = tab[0];
			await chrome.tabs.sendMessage(currentTab.id, {
				type: 'Content_writeToClipboard',
				text: textToWrite,
			});
		}

	} catch(err) {
		console.error(err);
	}
};

