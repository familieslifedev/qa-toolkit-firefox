import type { BaseMessageHandler, HandlerResponse } from "~Services/Background/Handlers/BaseMessageHandler";
import * as backgroundMessageHandler from "~Services/Background/backgroundMessageHandler";
import { initialiseContextMenu } from "~Services/contextMenu/contextMenuController";
import type { Request as BackgroundRequest } from "~Services/Background/Request";
import browser from "webextension-polyfill";

export const initializeMessageListener = () => {
	browser.runtime.onMessage.addListener((request: BackgroundRequest, sender, sendResponse: HandlerResponse) => {
		const handler: BaseMessageHandler = backgroundMessageHandler.MakeHandler(request);
		handler.handle(request, sendResponse);
		return true;
	});
};

export const initializeInstallListener = () => {
	browser.runtime.onInstalled.addListener(() => {
		initialiseContextMenu();
	});
};
