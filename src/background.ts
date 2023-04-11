import * as backgroundMessageHandler from "./Utils/backgroundMessageHandler";
import * as contextMenuController from "./contextMenu/contextMenuController"
import { initialiseContextMenu } from "./contextMenu/contextMenuController";
export {};
console.log('background script loaded');


// initialize Background Message Handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handler = backgroundMessageHandler[request.type];
  if (handler) {
    handler(request, sender, sendResponse);
  } else {
    console.error("Unknown message type:", request.type);
  }
});


//initialize Context Menu Controller
chrome.runtime.onInstalled.addListener(() => {initialiseContextMenu()});
