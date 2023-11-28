import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";

export class GetCurrentUrl extends BaseMessageHandler {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		try {
			await super.handle(request, sendResponse);

			const currentTabUrl: string = this.currentTab[0]?.url;

			if (!currentTabUrl) {
				console.error("GetCurrentUrl: Current tab URL is undefined");
				sendResponse({ error: "Current tab URL is undefined" });
				return;
			}

			sendResponse(currentTabUrl);
		} catch (error) {
			console.error("Error in GetCurrentUrl handle:", error);
			sendResponse({ error: "Error occurred in GetCurrentUrl" });
		}
	}
}
