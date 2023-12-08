import React, { useState } from "react";
import browser from "webextension-polyfill";

function DebugCommands() {
	const [regenXValue, setRegenXValue] = useState(null);
	const [regenYValue, setRegenYValue] = useState(null);
	const [node1Value, setNode1Value] = useState(null);
	const [node2Value, setNode2Value] = useState(null);
	const [expanded, setExpanded] = useState('panel1');

	const handleInputChange = (setter) => (e) => {
		setter(e.target.value === "" ? null : Number(e.target.value));
	};

	const handleTourCommand = (command) => {
		console.log(command);
		browser.tabs.executeScript({
			code: 'window.wrappedJSObject.' + command
		}).then(undefined);
	};

	const handleButtonClick = (commandGenerator) => () => {
		const command = typeof commandGenerator === 'function' ? commandGenerator() : commandGenerator;
		handleTourCommand(command);
	};

	const handleAccordionChange = (panel) => () => {
		setExpanded(expanded === panel ? false : panel);
	};

	return (
		<div style={{ width: 350, display: 'grid', gap: 10, border: '1px solid', borderRadius: 10, padding: 10 }}>
			<div>
				<div onClick={handleAccordionChange('3DTours')} style={{ fontWeight: 'bold', cursor: 'pointer' }}>3D Tours</div>
				{expanded === '3DTours' && (
					<div style={{ display: 'grid', gap: 10 }}>
						{/* 3D Tours Components */}
						<div>
							<input id="RegenX" onChange={handleInputChange(setRegenXValue)} value={regenXValue} type="number" placeholder="X" style={{ width: 80 }} />
							<input id="RegenY" onChange={handleInputChange(setRegenYValue)} value={regenYValue} type="number" placeholder="Y" style={{ width: 80 }} />
							<button onClick={handleButtonClick(`__debugApi__.navigation.regeneratePath(${regenXValue},${regenYValue})`)}>Regenerate Route</button>
						</div>
						<button onClick={handleButtonClick("__debugApi__.navigation.drawPath()")}>Draw Route</button>
						<div>
							<input id="Node1" onChange={handleInputChange(setNode1Value)} value={node1Value} type="number" placeholder="1st" style={{ width: 80 }} />
							<input id="Node2" onChange={handleInputChange(setNode2Value)} value={node2Value} type="number" placeholder="2nd" style={{ width: 80 }} />
							<button onClick={handleButtonClick(`__debugApi__.navigation.drawEdges(${node1Value},${node2Value})`)}>Draw Edges</button>
						</div>
						<button onClick={handleButtonClick("__debugApi__.navigation.drawNodes()")}>Draw Nodes</button>
						<button onClick={handleButtonClick("__debugApi__.navigation.drawPrunedNodes()")}>Draw Pruned</button>
						<button onClick={handleButtonClick("__debugApi__.navigation.drawWidgetBounds()")}>Widget Bounds</button>
						<button onClick={handleButtonClick("__debugApi__.clear()")}>Clear All</button>
					</div>
				)}
			</div>
			<div>
				<div onClick={handleAccordionChange('FloorShapes')} style={{ fontWeight: 'bold', cursor: 'pointer' }}>Floor Shapes</div>
				{expanded === 'FloorShapes' && (
					<div style={{ display: 'grid', gap: 10 }}>
						{/* Floor Shapes Components */}
						<button onClick={handleButtonClick("__debugApi__.drawFloorInnerFeatures()")}>Draw Floor Inner Features</button>
						<button onClick={handleButtonClick("__debugApi__.drawFloorInnerShapes()")}>Draw Floor Inner Shapes</button>
						<button onClick={handleButtonClick("__debugApi__.drawFloorOuterFeatures()")}>Draw Floor Outer Features</button>
						<button onClick={handleButtonClick("__debugApi__.drawFloorOuterShapes()")}>Draw Floor Outer Shapes</button>
						<button onClick={handleButtonClick("__debugApi__.clear()")}>Clear All</button>
					</div>
				)}
			</div>
			<div>
				<div onClick={handleAccordionChange('AutoLayout')} style={{ fontWeight: 'bold', cursor: 'pointer' }}>Auto Layout</div>
				{expanded === 'AutoLayout' && (
					<div style={{ display: 'grid', gap: 10 }}>
						{/* Auto Layout Components */}
						<button onClick={handleButtonClick("__debugApi__.drawFloorInnerFeatures()")}>Draw Floor Inner Features</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default DebugCommands;
