import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";

export class GetCurrentUrl extends BaseMessageHandler {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		await super.handle(request, sendResponse);

		const currentTabUrl: string = this.currentTab[0]?.url;
		sendResponse(currentTabUrl);
	}
}
