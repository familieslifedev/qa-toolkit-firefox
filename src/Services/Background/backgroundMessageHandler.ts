import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler";
import { Request as BackgroundRequest, RequestType } from "./Request";
import { SavePlanJson } from "./Handlers/SavePlanJson";
import { OpenUrl } from "./Handlers/OpenUrl";
import { OpenOptions } from "./Handlers/OpenOptions";
import { GetCurrentUrl } from "./Handlers/GetCurrentUrl";

export const MakeHandler = (request: BackgroundRequest): BaseMessageHandler => {

	switch (request.type) {

		case RequestType.SavePlanJson:
			return new SavePlanJson(null);

		case RequestType.OpenInCurrentTab:
			return new OpenUrl(null, false);

		case RequestType.OpenInNewTab:
			return new OpenUrl(null, true);

		case RequestType.OpenOptionsPage:
			return new OpenOptions(null);

		case RequestType.GetCurrentUrl:
			return new GetCurrentUrl("Failed to get current tab URL");
	}
};
