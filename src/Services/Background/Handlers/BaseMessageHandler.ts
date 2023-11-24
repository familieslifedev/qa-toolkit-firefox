import type { Request as BackgroundRequest } from "../Request";
import browser from "webextension-polyfill";

export interface BackgroundMessageHandler {
	handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void>;
}

export type HandlerResponse = {
	(response?: any): void
}

export abstract class BaseMessageHandler implements BackgroundMessageHandler {
	private readonly queryOptions: { active: boolean, lastFocusedWindow: boolean };
	protected errorMessage: string;
	protected currentTab: browser.Tabs.Tab[];
	protected currentTabId: number;

	protected constructor(errorMessage: string = null) {
		this.queryOptions = { active: true, lastFocusedWindow: true };
		this.errorMessage = errorMessage ?? "Error";
	}

	public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		console.log("Query Options:", this.queryOptions); // Debugging line
		this.currentTab = await browser.tabs.query(this.queryOptions);
		console.log("Current Tab:", this.currentTab); // Debugging line
		this.currentTabId = this.currentTab[0]?.id;
		if (this.currentTabId === undefined) {
			console.log("Tab undefined!");
		} else {
			console.log("Current Tab ID:", this.currentTabId); // Debugging line
		}
	}

	protected async execute(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		sendResponse();
	}
}
