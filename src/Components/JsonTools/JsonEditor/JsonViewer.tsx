import { useState, useRef } from "react";
import { copyFromClipboard, get2DJson, get3DJson, load2DJson, prettyPrintJson, writeToClipboard } from "~Utils/Utils";

interface JsonViewProps {
	edit: boolean;
}

const JsonViewer = ({ edit }: JsonViewProps): JSX.Element => {
	const [jsonData, setJsonData] = useState(null);
	const inputTextElement = useRef(null);

	const handleGet2dJson = async (): Promise<void> => await handleGetJson(get2DJson);
	const handleGet3dJson = async (): Promise<void> => await handleGetJson(get3DJson);
	const handleFromClipboard = async (): Promise<void> => await handleGetJson(copyFromClipboard, true);

	const getInput = async (): Promise<any> => {
		let jsonResult;

		try {
			jsonResult = await JSON.parse(inputTextElement?.current?.innerText);
		} catch (err) {
			jsonResult = null;
			console.warn(err.message);
		}

		return jsonResult;
	};

	const handleGetJson = async (getJsonCallback: () => Promise<any>, parseResult: boolean = false): Promise<void> => {
		try {
			let result = await getJsonCallback();
			result = parseResult ? JSON.parse(result as string) : result;

			if (!result) return;

			setJsonData(result);

		} catch (err) {
			setJsonData(`Invalid JSON: ${err.message}`);
		}
	};

	const handleJsonValidate = async (): Promise<void> => {
		const jsonToValidate = await getInput() ?? jsonData;

		try {
			if (!jsonToValidate) {
				alert("Please enter some JSON first");
				return;
			}

			alert("JSON is valid!");

		} catch (err) {
			alert(`Invalid JSON: ${err.message}`);
		}
	};

	const handleToClipboard = async (): Promise<void> => {
		const clipboardData = JSON.stringify(await getInput() ?? jsonData, null, 2);
		await writeToClipboard(clipboardData);
	};

	const handleLoadPlan = async (): Promise<void> => {
		const jsonToLoad = JSON.stringify(await getInput() ?? jsonData);
		await load2DJson(jsonToLoad);
	};

	return (
		<div className="jsonViewerContainer">
			<div className="jsonReplacerHeader">
				<div className="btn-group">
					<button title="Get the current pages 2d Json" className="btn btn-sm" onClick={handleGet2dJson}>Get
						2D
					</button>
					<button title="Get the current pages 3d Json" className="btn btn-sm" onClick={handleGet3dJson}>Get
						3D
					</button>
					<button title="Get Json from feeder link or a direct json" className="btn btn-sm"
							onClick={handleFromClipboard}>From Clipboard
					</button>
				</div>
			</div>

			<div className="jsonViewerContent mockup-code">
				{jsonData && (
					<pre ref={inputTextElement} spellCheck={false} contentEditable={edit}
						 dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(jsonData) }}></pre>
				)}
			</div>

			<div className="jsonReplacerHeader">
				<div className="btn-group">
					<button title="Validate the Json to ensure the integrity" className="btn btn-sm"
							onClick={handleJsonValidate}>Validate
					</button>
					<button title="Load the displayed 2d plan in planner" className="btn btn-sm"
							onClick={handleLoadPlan}>Load Plan
					</button>
					<button title="Write the currently displayed json to the clipboard" className="btn btn-sm"
							onClick={handleToClipboard}>To Clipboard
					</button>
				</div>
			</div>
		</div>
	);
};

export default JsonViewer;
