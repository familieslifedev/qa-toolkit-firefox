import { Request as BackgroundRequest, RequestType } from "~/Services/Background/Request";
import { FeedbackContext } from "~Utils/sidebarContext";
import JsonEditorModal from "~Components/JsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState, useRef } from "react";
import { JsonFixer } from "~/Services/JsonFixer";
import SwitchAndSaveModal from "~Components/SwitchAndSave/SwitchAndSaveModal";

//TODO create a better way to access the JSON editor.
export default function JsonTools(): JSX.Element {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [isJsonEditorVisible, setIsJsonEditorVisible] = useState<boolean>(false);
	const [isSNSVisible, setIsSNSVisible] = useState<boolean>(false);
	const [jsonFixer, setJsonFixer] = useState<JsonFixer>(new JsonFixer());
	const [leadNames, setLeadNames] = useState<Array<string>>(new Array<string>());
	const [selectedLeadName, setSelectedLeadName] = useState<string>("");

	// Load the lead names
	useEffect(() => {
		(async() => {
			const leads = await prepareLeadNames();
			setLeadNames(() => leads);
		})();
	}, []);

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

	function handleJsonEditorPanel(): void {
		setIsJsonEditorVisible(!isJsonEditorVisible);
	}

	function handleSNSPanel(): void {
		setIsSNSVisible(!isSNSVisible);
	}

	const getCurrentUrl = async (): Promise<string> => {
		const request: BackgroundRequest = {
			functionName: null,
			arguments: null,
			type: RequestType.GetCurrentUrl
		};
		const currentTabUrl: string = await chrome.runtime.sendMessage(request);
		if (!currentTabUrl) {
			console.error("Missing current tab URL when handling JSON fixer.");
		}

		return currentTabUrl ?? null;
	}

	const handleJsonFixer = async (): Promise<void> => {
		const currentTabUrl = await getCurrentUrl();

		await jsonFixer.registerJson();
		jsonFixer.scrapeFrontendDetails(currentTabUrl, selectedLeadName);
		await jsonFixer.fix();
	}

	const prepareLeadNames = async (): Promise<Array<string>> => {
		const currentTabUrl = await getCurrentUrl();
		if (!currentTabUrl) {
			return new Array<string>();
		}

		return jsonFixer.getLeads(currentTabUrl) ?? new Array<string>();
	}

	const selectLeadName = (event): void => {
		setSelectedLeadName(event.target.value);
	}

	return (
		<div className="jsonContainer">
			<button className="btn btn-sm btn-wide btn-primary" title={"Open Switch and Save Modal"} onClick={handleSNSPanel}>Switch and Save</button>
			<button className="btn btn-sm btn-wide btn-primary" title={"Open Json Viewer/Editor"} onClick={handleJsonEditorPanel}>Open Json Edit</button>
			<div>
				<JsonEditorModal hidden={!isJsonEditorVisible} onHiddenChange={handleJsonEditorPanel} />
			</div>
			<div>
				<SwitchAndSaveModal hidden={!isSNSVisible} onHiddenChange={handleSNSPanel} />
			</div>
			
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Selected Lead:</span>
				</label>
				<select onChange={selectLeadName} value={selectedLeadName} className="select select-primary select-xs select-bordered">
					{leadNames.map(leadName => (
						<option key={leadName} value={leadName}>
							{leadName}
						</option>
					))}
				</select>
			</div>
			
			<button className="btn btn-sm btn-wide btn-primary"
				title={"Requires: active frontend account page & JSON in clipboard - applies accountId, email, and leadId values to JSON"}
				onClick={handleJsonFixer}>Write account info to JSON</button>
		</div>
	);
}
