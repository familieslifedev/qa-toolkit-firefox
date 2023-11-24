import { createAccountContextMenu } from "~Services/contextMenu/contextNewAccountAutoInput";
import { create2dJsonToFeeder } from "~Services/contextMenu/contextSave2dJsonFeeder";
import browser from "webextension-polyfill";

export async function initialiseContextMenu() {
	// Create a parent context menu item
	browser.contextMenus.create({
		id: "parentContextMenu",
		title: "QA ToolKit",
		contexts: ["all"]
	});
	await createAccountContextMenu();
	await create2dJsonToFeeder();
}







