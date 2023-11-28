import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler";
import { ContentRequest, ContentRequestType } from "./Request";
import { WriteToClipboard } from "./Handlers/WriteToClipboard";
import { AutofillAccount } from "./Handlers/AutofillAccount";

export const MakeHandler = (request: ContentRequest): BaseMessageHandler => {
	console.log("Request type: ", request.type);

	switch (request.type) {

		case ContentRequestType.WriteToClipboard:
			return new WriteToClipboard("Failed to write to clipboard");

		case ContentRequestType.AutofillAccount:
			return new AutofillAccount("Failed to autofill account");

		default:
			console.error(`No handler found for request type: ${request.type}`);
			return null;
	}
};
