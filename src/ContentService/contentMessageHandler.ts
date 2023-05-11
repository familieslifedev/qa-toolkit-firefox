import type { BaseMessageHandler } from "./Handlers/BaseMessageHandler"
import { ContentRequest, ContentRequestType } from "./Request";
import { WriteToClipboard } from "./Handlers/WriteToClipboard";


export const MakeHandler = (request: ContentRequest): BaseMessageHandler => {
	
	switch(request.type) {

		case ContentRequestType.WriteToClipboard:
			return new WriteToClipboard("Failed to write to clipboard");
	}
}
