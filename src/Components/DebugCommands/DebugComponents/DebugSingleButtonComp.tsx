import React from "react";
import { injectDebugCommand } from "~Utils/Utils";

interface DebugSingleButtonProps {
	prettyName?: string;
	commandName?: string;
	hoverTip?: string;
	onClickFunction?: string;
	placeholder?: string | undefined;
}

async function sendDebugCommand(command?, argsArray?) {
	console.log("sendDebugCommand() called");
	await injectDebugCommand(command, argsArray);
}

const DebugSingleButton: React.FC<DebugSingleButtonProps> = ({
																 prettyName,
																 hoverTip,
																 onClickFunction
															 }) => {
	return (
		<button className="btn btn-xs btn-primary debugSingleButton" title={hoverTip}
				onClick={() => sendDebugCommand(onClickFunction)}>{prettyName}</button>

	);
};

export default DebugSingleButton;