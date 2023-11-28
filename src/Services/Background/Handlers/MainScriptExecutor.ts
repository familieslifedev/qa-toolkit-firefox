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

			// Unique event name to avoid conflicts
			const eventName = `customEvent-${Date.now()}`;

			// Listen for the custom event in the content script
			document.addEventListener(eventName, (event) => {
				const customEvent = event as CustomEvent;

				if (customEvent.detail) {
					sendResponse(customEvent.detail);
				} else {
					sendResponse(this.errorMessage);
				}
			}, { once: true });

			// Convert the callback function and arguments to a string
			const scriptContent = `
            (${this.callback.toString()})(${JSON.stringify(request.arguments)})
                .then(result => {
                    document.dispatchEvent(new CustomEvent('${eventName}', { detail: result }));
                })
                .catch(error => {
                    document.dispatchEvent(new CustomEvent('${eventName}', { detail: { error: error.message } }));
                });`;

			// Inject the script into the main page context
			await browser.tabs.executeScript(this.currentTabId, {
				code: `const script = document.createElement('script');
                   script.textContent = ${JSON.stringify(scriptContent)};
                   (document.head || document.documentElement).appendChild(script);
                   script.remove();`
			});

		} catch (err) {
			console.error(err);
			sendResponse(this.errorMessage);
		}
	}
}
