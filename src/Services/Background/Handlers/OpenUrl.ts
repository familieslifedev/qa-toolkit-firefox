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
			const tabId = this.currentTabId;
			await utils.openURL(url, tabId, this.openInNewTab);
		} catch (error) {
			sendResponse(error.message);
		}
	}
}
