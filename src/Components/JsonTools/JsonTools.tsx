import { Request as BackgroundRequest, RequestType } from "~/Services/Background/Request";
import { FeedbackContext } from "~Utils/sidebarContext";
import JsonEditorModal from "~Components/JsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState, useRef } from "react";
import { JsonFixer } from "~/Services/JsonFixer";

//TODO create a better way to access the JSON editor.
export default function JsonTools(): JSX.Element {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [isJsonEditorVisible, setIsJsonEditorVisible] = useState<boolean>(false);
	const [jsonFixer, setJsonFixer] = useState<JsonFixer>(new JsonFixer());
	const [leadNames, setLeadNames] = useState<Array<string>>(new Array<string>());
	const jsonFixerSelect = useRef();

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

	function handleJsonEditorPanel() {
		setIsJsonEditorVisible(!isJsonEditorVisible);
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

	const handleJsonFixer = async (e) => {
		const currentTabUrl = await getCurrentUrl();

		await jsonFixer.registerJson();
		jsonFixer.scrapeFrontendDetails(currentTabUrl, jsonFixerSelect.current.text);
		await jsonFixer.fix();
	}

	const populateJsonFixerDropdownWithLeads = async (): Promise<Array<string>> => {
		let leads: Array<string> = null;

		const currentTabUrl = await getCurrentUrl();
		if (!currentTabUrl) {
			return new Array<string>();
		}

		leads = jsonFixer.getLeads(currentTabUrl) ?? new Array<string>();

		return leads;
	}

	const prepareLeadNames = async (): Promise<Array<string>> => {
		let newLeadNames = new Array<string>();

		const leads = await populateJsonFixerDropdownWithLeads()
		for (let lead of leads) {
			newLeadNames.push(lead.trim());
		}

		return newLeadNames ?? new Array<string>();
	}

	const debugLeadNames = (): void => {
		const names = prepareLeadNames();
		console.log(names);
	}

	return (
		<div className="jsonContainer">
			<button className="btn btn-sm btn-wide btn-primary" title={"Open Json Viewer/Editor"} onClick={handleJsonEditorPanel}>Open Json Edit</button>
			<div>
				<JsonEditorModal hidden={!isJsonEditorVisible} onHiddenChange={handleJsonEditorPanel} />
			</div>
			
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Selected Lead:</span>
				</label>
				<select ref={jsonFixerSelect} onChange={handleJsonFixer} value="" className="select select-primary select-xs select-bordered">
					{leadNames.map(leadName => (
						<option key={leadName} value={leadName}>
							{leadName}
						</option>
					))}
				</select>
			</div>
			
			<button className="btn btn-sm btn-wide btn-primary"
				title={"Requires: active frontend account page & JSON in clipboard - applies accountId, email, and leadId values to JSON"}
				onClick={handleJsonFixer}>Apply account info to JSON</button>

			{/* <button className="btn btn-sm btn-wide btn-primary"
				title=""
				onClick={handleJsonFixer}>Debug: get lead names</button> */}
		</div>
	);
}
