import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";
import browser from "webextension-polyfill";

export class OpenOptions extends BaseMessageHandler {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public override async handle(_request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		await browser.runtime.openOptionsPage();
		sendResponse();
	}
}
