import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler";
import { Request as BackgroundRequest, RequestType } from "./Request";
import { SavePlanJson } from "./Handlers/SavePlanJson";
import { OpenUrl } from "./Handlers/OpenUrl";
import { OpenOptions } from "./Handlers/OpenOptions";
import { GetCurrentUrl } from "./Handlers/GetCurrentUrl";
import { DefaultHandler } from "./Handlers/DefaultHandler";

export const MakeHandler = (request: BackgroundRequest): BaseMessageHandler => {
	console.log("Request type: " + request.type);

	switch (request.type) {

		case RequestType.SavePlanJson:
			console.log("Creating BackgroundRequest", request);
			return new SavePlanJson("Failed to save plan JSON");

		case RequestType.OpenInCurrentTab:
			console.log("Creating BackgroundRequest", request);
			return new OpenUrl("Failed to open (current tab selected)", false);

		case RequestType.OpenInNewTab:
			console.log("Creating BackgroundRequest", request);
			return new OpenUrl("Failed to open (new tab selected)", true);

		case RequestType.OpenOptionsPage:
			console.log("Creating BackgroundRequest", request);
			return new OpenOptions("Failed to open Options");

		case RequestType.GetCurrentUrl:
			console.log("Creating BackgroundRequest", request);
			return new GetCurrentUrl("Failed to get current tab URL");

		default:
			console.error("request.type does not match any cases in the switch statement", request);
			return new DefaultHandler("Unknown request type");
	}
};
