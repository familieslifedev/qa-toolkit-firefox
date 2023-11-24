import { sendJsonToFeeder } from "~Utils/JsonHelper";
import type { HandlerResponse } from "./BaseMessageHandler";
import type { Request as BackgroundRequest } from "../Request";
import { MainScriptExecutor } from "./MainScriptExecutor";

export class SavePlanJson extends MainScriptExecutor {

	public constructor(errorMessage: string = null) {
		super(errorMessage);
	}

	public async handle(request: BackgroundRequest, sendResponse: HandlerResponse): Promise<void> {
		await super.handle(request, sendResponse);

		const currentTabUrl: string = this.currentTab[0]?.url;
		const planId: number = this.result[0]?.result?.plan?.planId;
		const jsonResult: any = this.result[0]?.result;

		const urlText: string = await sendJsonToFeeder(jsonResult, planId, currentTabUrl);
		sendResponse(urlText);
	}
}
