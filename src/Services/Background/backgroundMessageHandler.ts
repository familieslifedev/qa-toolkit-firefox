import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler"
import { Request as BackgroundRequest, RequestType } from "./Request";
import { InjectConsoleCommand } from "./Handlers/InjectConsoleCommand"
import { GetJson } from "./Handlers/GetJson"
import { SavePlanJson } from "./Handlers/SavePlanJson"
import { OpenUrl } from "./Handlers/OpenUrl";
import { OpenOptions } from "./Handlers/OpenOptions";


export const MakeHandler = (request: BackgroundRequest): BaseMessageHandler => {
	
	switch(request.type) {

		case RequestType.InjectConsoleCommand:
			return new InjectConsoleCommand(null);

		case RequestType.Get2dJson:
			return new GetJson("Missing 2D JSON Result");

		case RequestType.Get3dJson:
			return new GetJson("Missing 3D JSON Result");

		case RequestType.SavePlanJson:
			return new SavePlanJson(null);

		case RequestType.OpenInCurrentTab:
			return new OpenUrl(null, false);

		case RequestType.OpenInNewTab:
			return new OpenUrl(null, true);

		case RequestType.OpenOptionsPage:
			return new OpenOptions(null);
	}
}
