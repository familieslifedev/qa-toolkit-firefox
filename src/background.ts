import type { BaseMessageHandler, HandlerResponse } from "~BackgroundService/Handlers/BaseMessageHandler";
import * as backgroundMessageHandler from "./BackgroundService/backgroundMessageHandler";
import { initialiseContextMenu } from "./contextMenu/contextMenuController";
import type { Request as BackgroundRequest } from "./BackgroundService/Request";
console.log('background script loaded');


// initialize Background Message Handler
chrome.runtime.onMessage.addListener((request: BackgroundRequest, sender, sendResponse: HandlerResponse) => {
  
  const handler: BaseMessageHandler = backgroundMessageHandler.MakeHandler(request);
  handler.handle(request, sendResponse);
});

//initialize Context Menu Controller
chrome.runtime.onInstalled.addListener(() => {initialiseContextMenu()});
