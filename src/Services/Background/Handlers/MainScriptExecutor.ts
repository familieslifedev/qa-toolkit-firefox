import { commandMap } from "~Utils/consoleCommandMap";
import type { Request as BackgroundRequest } from "../Request";
import { BaseMessageHandler, HandlerResponse } from "./BaseMessageHandler";
import browser from "webextension-polyfill";

export class MainScriptExecutor extends BaseMessageHandler {
	protected result: any;
	private callback: (requestArgs: any) => any; // change signature

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public override async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		this.callback = commandMap.get(request.functionName);

		await this.execute(request, sendResponse);
	}

	protected async execute(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		try {
			await super.handle(request, sendResponse);

			[this.result] = await Promise.all([browser.scripting.executeScript({
				target: { tabId: this.currentTabId },
				// @ts-ignore
				world: browser.scripting.ExecutionWorld.MAIN,
				args: request.arguments,
				func: this.callback
			})]);
			if (!this.result) {
				sendResponse(this.errorMessage);
				throw new Error(this.errorMessage);
			}

			sendResponse(this.result[0].result);

		} catch (err) {
			console.error(err);
		}
	}
}
