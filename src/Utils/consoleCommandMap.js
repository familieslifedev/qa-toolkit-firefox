const consoleCommands = {
	//<editor-fold desc="General">
	debugClear: () => __debugApi__.clear(),
	//</editor-fold>  a
	//<editor-fold desc="Json Commands">
	get2DJson: (...args) => __debugApi__.get2DJson(),
	get3DJson: (...args) => __debugApi__.get3DJson(),
	set2DJson: (...args) => __debugApi__.set2DJson(...args),
	set2DJsonByURL: (...args) => __debugApi__.set2DJsonByUrl(...args),
	getPlanImages: (...args) => __debugApi__.getPlanImages(),
	//</editor-fold>
	//<editor-fold desc="CPP">
	showCornice: () => __debugApi__.drawCorniceRuns(),
	showPelmet: () => __debugApi__.drawPelmetRuns(),
	showPlinth: () => __debugApi__.drawPlinthRuns(),
	//</editor-fold>
	//<editor-fold desc="RoomItems">
	drawCollisionPolygons: () => __debugApi__.drawCollisionPolygons(),
	drawCeilingOuterShapes: () => __debugApi__.drawCeilingOuterShapes(),
	drawFloorOuterShapes: () => __debugApi__.drawFloorOuterShapes(),

	//</editor-fold>
	//<editor-fold desc="Worktops">
	drawCutoutPositions: () => __debugApi__.drawCutoutPositions(),
	//</editor-fold>
	//<editor-fold desc="3d Tours">
	tourRegeneratePath: () => __debugApi__.navigation.regeneratePath(),
	drawTourPath: () => __debugApi__.navigation.drawPath(),
	drawTourEdges: () => __debugApi__.navigation.drawEdges(),
	drawTourNodes: () => __debugApi__.navigation.drawNodes(),
	drawTourPrunedNodes: () => __debugApi__.navigation.drawPrunedNodes(),
	drawTourWidgetBounds: () => __debugApi__.navigation.drawWidgetBounds(),
	//</editor-fold>

}

export const commandMap = new Map(Object.entries(consoleCommands))
