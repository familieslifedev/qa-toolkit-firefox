import DebugSingleButton
	from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugComponents/DebugSingleButtonComp";
import { injectDebugCommand } from "~Utils/Utils";

export default function DebugGeneral() {

	async function sendDebugCommand(command?, argsArray?) {
		console.log('sendDebugCommand() called');
		await injectDebugCommand(command, argsArray);
	}

	return(
		<div className="DebugCompContainer">
			<DebugSingleButton prettyName="Get Preview Image" onClickFunction={() => sendDebugCommand('showCornice')}/>
		</div>
	)
}