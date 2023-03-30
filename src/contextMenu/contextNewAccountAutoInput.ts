import { Storage } from "@plasmohq/storage";


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
  console.log('Updating account context menu item');
  let accounts: any = await frontendAccountStorage.get('frontendAccounts');
  console.log(accounts);

  // Iterate over the accounts array
  accounts.forEach((account) => {
    console.log(account);
    chrome.contextMenus.create({
      id: 'accountContextMenu-' + account.id.toString(),
      title: account.emailAddress,
      contexts: ['all'],
      parentId: 'accountContextMenu',
    });
  });
}


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'parentContextMenu') {
    return;
  }

  // Check if the clicked item has the parent of accountContextMenu
  const parentId = 'accountContextMenu';
  if ((info.menuItemId as string).startsWith(parentId + '-')) {
    console.log('clicked on account context menu item');
    chrome.tabs.sendMessage(tab.id, {
      type: 'Content_inputFrontendAccount',
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