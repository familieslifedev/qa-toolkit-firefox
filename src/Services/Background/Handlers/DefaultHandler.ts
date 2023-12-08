import { BaseMessageHandler } from "~Services/Background/Handlers/BaseMessageHandler";

export class DefaultHandler extends BaseMessageHandler {
	constructor(errorMessage: string) {
		super(errorMessage);
	}

}