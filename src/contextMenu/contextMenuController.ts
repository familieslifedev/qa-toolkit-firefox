import { Storage } from "@plasmohq/storage"
import { createAccountContextMenu } from "~contextMenu/contextNewAccountAutoInput";

const frontendAccountStorage = new Storage();
export async function initialiseContextMenu() {
  // Create a parent context menu item
  console.log('Creating parent context menu item');
  chrome.contextMenus.create({
    id: 'parentContextMenu',
    title: 'QA ToolKit',
    contexts: ['all'],
  });
  await createAccountContextMenu()
}







