import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler";
import { Request as BackgroundRequest, RequestType } from "./Request";
import { SavePlanJson } from "./Handlers/SavePlanJson";
import { OpenUrl } from "./Handlers/OpenUrl";
import { OpenOptions } from "./Handlers/OpenOptions";
import { GetCurrentUrl } from "./Handlers/GetCurrentUrl";

export const MakeHandler = (request: BackgroundRequest): BaseMessageHandler => {
	console.log("Request type: " + request.type);

	switch (request.type) {

		case RequestType.SavePlanJson:
			return new SavePlanJson("Failed to save plan JSON");

		case RequestType.OpenInCurrentTab:
			return new OpenUrl("Failed to open (current tab selected)", false);

		case RequestType.OpenInNewTab:
			return new OpenUrl("Failed to open (new tab selected)", true);

		case RequestType.OpenOptionsPage:
			return new OpenOptions("Failed to open Options");

		case RequestType.GetCurrentUrl:
			return new GetCurrentUrl("Failed to get current tab URL");

		default:
			console.error("request.type does not match any cases in the switch statement");
			return null;
	}
};
