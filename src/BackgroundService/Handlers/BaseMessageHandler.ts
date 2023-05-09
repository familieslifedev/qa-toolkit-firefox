import type { Request as BackgroundRequest } from "../Request";


export interface BackgroundMessageHandler {
    handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void>;
}

export type HandlerResponse = {
    (response?: any): void
}

export abstract class BaseMessageHandler implements BackgroundMessageHandler {
    private queryOptions: { active: boolean, lastFocusedWindow: boolean };
    protected errorMessage: string;
    protected currentTab: chrome.tabs.Tab[];
    protected currentTabId: number;

    public constructor(errorMessage: string = null) {
        this.queryOptions = { active: true, lastFocusedWindow: true };
        this.errorMessage = errorMessage ?? "Error";
    }

    public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
        this.currentTab = await chrome.tabs.query(this.queryOptions);
        this.currentTabId = this.currentTab[0].id;
    }

    protected async execute(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
        sendResponse();
    }
}
