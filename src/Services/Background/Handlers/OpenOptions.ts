import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from '../Request';

export class OpenOptions extends BaseMessageHandler {

    public constructor(errorMessage: string = null) {
        super(errorMessage);
    }

    public override async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
        chrome.runtime.openOptionsPage();
        sendResponse();
    }
}
