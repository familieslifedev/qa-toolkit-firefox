import { Storage } from "@plasmohq/storage";
import type { FrontendAccount } from "~Utils/UtilInterfaces";


const frontendAccountStorage = new Storage();
export async function createAccountContextMenu() {
	chrome.contextMenus.create({
		id: "accountContextMenu",
		title: "Frontend Accounts",
		contexts: ["all"],
		parentId: "parentContextMenu",
		documentUrlPatterns: ["https://*.wrenkitchens.com/accounts/account/new"]
	});
	await PopulateAccountContextMenu();
}

async function PopulateAccountContextMenu() {
	const accounts: FrontendAccount[] = await frontendAccountStorage.get('frontendAccounts');
	if (!accounts) {
		console.error('Failed to find accounts');
		return;
	}

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
		const allAccounts:FrontendAccount[] = await frontendAccountStorage.get('frontendAccounts');
		if(!allAccounts) {
			console.error("Failed to find accounts")
			return;
		}
		const selectedAccount = allAccounts.find((account) => account.id.toString() === info.menuItemId);

		// Send the entire account data
		if(selectedAccount){
			await chrome.tabs.sendMessage(tab.id, {
				type: 'Content_inputFrontendAccount',
				account: selectedAccount,
			});
		}
		else {
			console.error('Could not find account with id: ' + info.menuItemId);
		}

	}
});


function updateContextMenu() {
	chrome.contextMenus.remove('accountContextMenu', async () => {
		await createAccountContextMenu();
	});
}

frontendAccountStorage.watch({
	"frontendAccounts": () => {
		updateContextMenu();
	}
})