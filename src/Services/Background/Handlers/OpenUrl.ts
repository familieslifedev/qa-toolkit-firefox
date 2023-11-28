import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";
import * as utils from "../../../Utils/Utils";

export class OpenUrl extends BaseMessageHandler {

	private readonly openInNewTab: boolean;

	public constructor(errorMessage: string = null, openInNewTab: boolean) {
		super(errorMessage);
		this.openInNewTab = openInNewTab;
	}

	public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		try {
			const url = request.arguments[0];
			if (!url) {
				throw new Error("URL is missing");
			}
			const tabId = this.currentTabId;
			await utils.openURL(url, tabId, this.openInNewTab);
			sendResponse({ success: true, message: "URL opened successfully" });
		} catch (error) {
			console.error("Error in OpenUrl handle:", error);
			sendResponse({ success: false, error: error.message });
		}
	}
}
