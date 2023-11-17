import { Storage } from "@plasmohq/storage"
import { createAccountContextMenu } from "~Services/contextMenu/contextNewAccountAutoInput";
import { create2dJsonToFeeder } from "~Services/contextMenu/contextSave2dJsonFeeder";
import browser from "webextension-polyfill";

const frontendAccountStorage = new Storage();
export async function initialiseContextMenu() {
	// Create a parent context menu item
	await browser.contextMenus.create({
		id: 'parentContextMenu',
		title: 'QA ToolKit',
		contexts: ['all'],
	});
	await createAccountContextMenu();
	await create2dJsonToFeeder();
}







