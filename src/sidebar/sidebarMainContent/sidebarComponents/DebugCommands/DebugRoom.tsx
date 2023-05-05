import DebugSingleButton
	from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugComponents/DebugSingleButtonComp";

export default function DebugRoom() {



	return(
		<div className="DebugCompContainer">
			<DebugSingleButton prettyName="Collsion Shapes" onClickFunction='drawCollisionPolygons'/>
			<DebugSingleButton prettyName="Ceiling Outer Shapes" onClickFunction='drawCeilingOuterShapes'/>
			<DebugSingleButton prettyName="Floor Outer Shapes" onClickFunction='drawFloorOuterShapes'/>
			<DebugSingleButton prettyName="Overlap Polygons" onClickFunction='drawOverlapPolygons'/>
		</div>
	)
}