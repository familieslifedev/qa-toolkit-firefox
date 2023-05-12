import type { BaseMessageHandler, HandlerResponse } from "~Services/Background/Handlers/BaseMessageHandler";
import * as backgroundMessageHandler from "./Services/Background/backgroundMessageHandler";
import { initialiseContextMenu } from "./Services/contextMenu/contextMenuController";
import type { Request as BackgroundRequest } from "./Services/Background/Request";
console.log('background script loaded');


// initialize Background Message Handler
chrome.runtime.onMessage.addListener((request: BackgroundRequest, sender, sendResponse: HandlerResponse) => {
  
  const handler: BaseMessageHandler = backgroundMessageHandler.MakeHandler(request);
  handler.handle(request, sendResponse);
  return true;
});

//initialize Context Menu Controller
chrome.runtime.onInstalled.addListener(() => {initialiseContextMenu()});
