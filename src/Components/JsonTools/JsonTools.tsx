import {FeedbackContext} from "~Utils/sidebarContext";
import JsonEditorModal from "~Components/JsonTools/JsonEditor/JsonEditorModal";
import { useContext, useEffect, useState } from "react";

//TODO create a better way to access the JSON editor.
export default function JsonTools() {
	const { setFeedbackText } = useContext(FeedbackContext);
	const [isJsonEditorVisible, setIsJsonEditorVisible] = useState(false);

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

	return (

		<div className="jsonContainer">
			<button className="btn btn-sm btn-wide btn-primary" title={"Open Json Viewer/Editor"} onClick={handleJsonEditorPanel}>Open Json Edit</button>
			<div>
				<JsonEditorModal hidden={!isJsonEditorVisible} onHiddenChange={handleJsonEditorPanel}/>
			</div>

		</div>
	);
}

