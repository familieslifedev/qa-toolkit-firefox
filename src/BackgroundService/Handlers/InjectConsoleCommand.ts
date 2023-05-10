import type { HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from '../Request';
import { MainScriptExecutor } from "./MainScriptExecutor";

export class InjectConsoleCommand extends MainScriptExecutor {
    public constructor(errorMessage: string) {
        super(errorMessage);
    }

    public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
        super.handle(request, sendResponse);
    }
}
