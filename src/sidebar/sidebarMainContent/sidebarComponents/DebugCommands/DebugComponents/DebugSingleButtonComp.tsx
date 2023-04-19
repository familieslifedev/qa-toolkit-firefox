
import React from "react";

interface DebugSingleButtonProps {
	prettyName?: string;
	commandName?: string;
	hoverTip?: string;
	onClickFunction?: () => void;
	placeholder?: string | undefined;
}

const DebugSingleButton: React.FC<DebugSingleButtonProps> = ({ prettyName,commandName, hoverTip ,onClickFunction,placeholder }) => {
	return (
		<button className="btn btn-sm btn-primary debugSingleButton" title={hoverTip} type="button" onClick={onClickFunction}>{prettyName}</button>

	);
}

export default DebugSingleButton;