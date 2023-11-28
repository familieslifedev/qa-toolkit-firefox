import type { BaseMessageHandler, HandlerResponse } from "~Services/Background/Handlers/BaseMessageHandler";
import * as backgroundMessageHandler from "~Services/Background/backgroundMessageHandler";
import { initialiseContextMenu } from "~Services/contextMenu/contextMenuController";
import type { Request as BackgroundRequest } from "~Services/Background/Request";
import browser from "webextension-polyfill";

export const initializeMessageListener = () => {
	console.log("initializeMessageListener executing...");
	browser.runtime.onMessage.addListener((request: BackgroundRequest, sender, sendResponse: HandlerResponse) => {
		const handler: BaseMessageHandler = backgroundMessageHandler.MakeHandler(request);
		handler.handle(request, sendResponse).then(response => {
			console.log("eventListeners:initializeMessageListener - Response received:", response);
		})
			.catch(error => {
				console.error("eventListeners:initializeMessageListener - Error sending message:", error);
			});
		console.log("initializeMessageListener loaded successfully");
		return true;
	});
};

export const initializeInstallListener = () => {
	console.log("initializeInstallListener executing...");
	browser.runtime.onInstalled.addListener(() => {
		initialiseContextMenu().then(response => {
			console.log("eventListeners:initializeInstallListener - Response received:", response);
		})
			.catch(error => {
				console.error("eventListeners:initializeInstallListener - Error sending message:", error);
			});
		console.log("initializeInstallListener loaded successfully");
	});
};
