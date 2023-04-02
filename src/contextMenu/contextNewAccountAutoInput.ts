import { Storage } from "@plasmohq/storage";
import type { FrontendAccount } from "~Utils/UtilInterfaces";


const frontendAccountStorage = new Storage();
export function createAccountContextMenu() {
  chrome.contextMenus.create({
    id: 'accountContextMenu',
    title: 'Frontend Accounts',
    contexts: ['all'],
    parentId: 'parentContextMenu',
    documentUrlPatterns: ['https://*.wrenkitchens.com/accounts/account/new'],
  });
  PopulateAccountContextMenu();
}

async function PopulateAccountContextMenu() {
  let accounts: any = await frontendAccountStorage.get('frontendAccounts');

  // Iterate over the accounts array
  accounts.forEach((account) => {
    chrome.contextMenus.create({
      id: account.id.toString(),
      title: account.emailAddress,
      contexts: ['all'],
      parentId: 'accountContextMenu',
    });
  });
}


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'parentContextMenu') {
    return;
  }

  // Check if the clicked item has the parent of accountContextMenu
  const parentId = 'accountContextMenu';
  if ((info.parentMenuItemId as string) == 'accountContextMenu') {
    // Retrieve account data
    let allAccounts:FrontendAccount[] = await frontendAccountStorage.get('frontendAccounts');
    let selectedAccount = allAccounts.find((account) => account.id.toString() === info.menuItemId);

    // Send the entire account data
    chrome.tabs.sendMessage(tab.id, {
      type: 'Content_inputFrontendAccount',
      account: selectedAccount,
    });
  }
});


function updateContextMenu() {
  chrome.contextMenus.remove('accountContextMenu', () => {
    createAccountContextMenu();
  });
}

frontendAccountStorage.watch({
  "frontendAccounts": () => {
    updateContextMenu();
  }
})