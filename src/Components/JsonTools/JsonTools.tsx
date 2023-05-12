import { Request as BackgroundRequest, RequestType } from "~/Services/Background/Request";
import { FeedbackContext } from "~Utils/sidebarContext";
import JsonEditorModal from "~Components/JsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState } from "react";
import { JsonFixer } from "~/Services/JsonFixer";

//TODO create a better way to access the JSON editor.
export default function JsonTools() {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [isJsonEditorVisible, setIsJsonEditorVisible] = useState<boolean>(false);
	const [jsonFixer, setJsonFixer] = useState<JsonFixer>(new JsonFixer());

	//Stop Planner consuming all inputs and take priority when the editor is open.
	useEffect(() => {
		function handleKeyDown(event) {
			if (isJsonEditorVisible) {
				event.stopPropagation();
			} else {
				// Allow the event to propagate to other event listeners
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isJsonEditorVisible]);


	function handleJsonEditorPanel() {
		setIsJsonEditorVisible(!isJsonEditorVisible);
	}

	const handleJsonFixer = async () => {
		const request: BackgroundRequest = {
			functionName: null,
			arguments: null,
			type: RequestType.GetCurrentUrl
		};
		const currentTabUrl: string = await chrome.runtime.sendMessage(request);
		if (!currentTabUrl) {
			console.error("Missing current tab URL when handling JSON fixer.");
			return;
		}

		await jsonFixer.registerJson();
		jsonFixer.scrapeFrontendDetails(currentTabUrl);
		await jsonFixer.fix();
	}

	return (

		<div className="jsonContainer">
			<button className="btn btn-sm btn-wide btn-primary" title={"Open Json Viewer/Editor"} onClick={handleJsonEditorPanel}>Open Json Edit</button>
			<div>
				<JsonEditorModal hidden={!isJsonEditorVisible} onHiddenChange={handleJsonEditorPanel} />
			</div>
			<button className="btn btn-sm btn-wide btn-primary"
				title={"Requires: active frontend account page & JSON in clipboard - applies accountId, email, and leadId values to JSON"}
				onClick={handleJsonFixer}>Apply account info to JSON</button>
		</div>
	);
}
