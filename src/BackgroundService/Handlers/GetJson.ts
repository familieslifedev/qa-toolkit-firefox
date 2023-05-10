import type { HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from '../Request';
import { MainScriptExecutor } from "./MainScriptExecutor";

export class GetJson extends MainScriptExecutor {

    public constructor(errorMessage: string = null) {
        super(errorMessage);
    }

    public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
        super.handle(request, sendResponse);
    }
}
