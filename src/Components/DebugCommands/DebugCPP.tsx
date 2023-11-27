import DebugSingleButton
	from "~Components/DebugCommands/DebugComponents/DebugSingleButtonComp";

export default function DebugCPP() {
	return (
		<div className="DebugCompContainer">
			<DebugSingleButton prettyName="Show Cornice" onClickFunction="showCornice" />
			<DebugSingleButton prettyName="Show Pelmet" onClickFunction="showPelmet" />
			<DebugSingleButton prettyName="Show Plinth" onClickFunction="showPlinth" />
		</div>
	);
}