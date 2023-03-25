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
    const url = "https://feeder.project2.wrenkitchens.com/plan/save-plan-json";
    const headers = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded",
    };
     let filename = "wooo12345678.json";
     let planJson =  JSON.stringify(outerResult[0].result);
    const body = `filename=${filename}&planJson=${encodeURIComponent(planJson)}`;
    const method = "POST";

    fetch(url, {
      headers: headers,
      method: method,
      body: body
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  } catch(err) {
    console.error(err);
  }
};

