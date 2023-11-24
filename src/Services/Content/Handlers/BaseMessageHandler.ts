import type { ContentRequest } from "../Request";

export interface MessageHandler {
	handle(request: ContentRequest, sendResponse: HandlerResponse): Promise<void>;
}

export type HandlerResponse = {
	(response?: any): void
}

export abstract class BaseMessageHandler implements MessageHandler {
	protected errorMessage: string;

	protected constructor(errorMessage: string = null) {
		this.errorMessage = errorMessage ?? "Error";
	}

	public async handle(request: ContentRequest, sendResponse: HandlerResponse): Promise<void> {
		sendResponse();
	}
}
