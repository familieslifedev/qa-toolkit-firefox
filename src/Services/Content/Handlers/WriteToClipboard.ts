import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import type { ContentRequest } from "../Request";
import { writeToClipboard } from "~Utils/Utils";

export class WriteToClipboard extends BaseMessageHandler {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public async handle(request: ContentRequest, sendResponse: HandlerResponse): Promise<void> {

		if (request.arguments.length < 1) throw new Error(`WriteToClipboard handler arguments: Expected first argument to be text to write. Received ${request.arguments.length} arguments.`);
		const textToWrite: string = request.arguments[0];

		await writeToClipboard(textToWrite);
		sendResponse();
	}
}
