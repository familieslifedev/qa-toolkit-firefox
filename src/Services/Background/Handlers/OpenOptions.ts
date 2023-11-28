import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";
import browser from "webextension-polyfill";

export class OpenOptions extends BaseMessageHandler {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public override async handle(_request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		try {
			await browser.runtime.openOptionsPage();
			console.log("Options page opened successfully");
			sendResponse({ success: true });
		} catch (error) {
			console.error("Error opening options page:", error);
			sendResponse({ error: "Failed to open options page" });
		}
	}
}
