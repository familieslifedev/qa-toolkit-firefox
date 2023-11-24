import DebugSingleButton
	from "~Components/DebugCommands/DebugComponents/DebugSingleButtonComp";

export default function Debug3dTours() {
	return (
		<div className="DebugCompContainer">
			<DebugSingleButton prettyName="Regenerate Path" hoverTip="Some other commands rely on this"
							   onClickFunction="tourRegeneratePath" />
			<DebugSingleButton prettyName="Path" onClickFunction="drawTourPath" />
			<DebugSingleButton prettyName="Edges" onClickFunction="drawTourEdges" />
			<DebugSingleButton prettyName="Nodes" onClickFunction="drawTourNodes" />
			<DebugSingleButton prettyName="Pruned Nodes" onClickFunction="drawTourPrunedNodes" />
			<DebugSingleButton prettyName="Widget Bounds" onClickFunction="drawTourWidgetBounds" />
		</div>
	);
}