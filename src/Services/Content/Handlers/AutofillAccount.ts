import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { ContentRequest } from '../Request';
import { autofillUkFrontendAccount, autofillUsFrontendAccount } from "~Utils/UtilsDomManipulation";
import type { FrontendAccount } from "~Utils/UtilInterfaces";

export class AutofillAccount extends BaseMessageHandler {

    public constructor(errorMessage: string = null) {
        super(errorMessage);
    }

    public async handle(request: ContentRequest, sendResponse: HandlerResponse): Promise<void> {
        console.log("autofill accounts");

        if (request.arguments.length < 2) throw new Error("AutofillAccount handler requires at least 2 arguments: [0] accountRegion, [1] account");
        const accountRegion: string = request.arguments[0];
        const account: FrontendAccount = request.arguments[1];

        try {
            accountRegion === "UK" ? await autofillUkFrontendAccount(account) : await autofillUsFrontendAccount(account);
        } catch (error) {
            console.error('Error auto filling account:', error);
        }

        sendResponse();
    }
}
