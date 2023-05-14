import { Storage } from "@plasmohq/storage";
import type { FrontendAccount } from "~Utils/UtilInterfaces";
import { ContentRequest, ContentRequestType } from "~Services/Content/Request";

const frontendAccountStorage = new Storage();
const frontendAccountStorageUS = new Storage();
export async function createAccountContextMenu() {
	chrome.contextMenus.create({
		id: "accountContextMenu",
		title: "Frontend Accounts",
		contexts: ["all"],
		parentId: "parentContextMenu",
		documentUrlPatterns: ["https://*.wrenkitchens.com/accounts/account/new"],
	});
	chrome.contextMenus.create({
		id: "usAccountContextMenu",
		title: "US Frontend Accounts",
		contexts: ["all"],
		parentId: "parentContextMenu",
		documentUrlPatterns: ["https://*.wrenkitchens.us/accounts/account/new"],
	});
	await PopulateAccountContextMenu();
}

async function PopulateAccountContextMenu() {
	const accounts: FrontendAccount[] = await frontendAccountStorage.get("frontendAccounts");
	const accountsUS: FrontendAccount[] = await frontendAccountStorageUS.get("frontendAccountsUS");

	if (!accounts) {
		console.error("Failed to find UK accounts");
	} else {
		// Iterate over the UK accounts array
		accounts.forEach((account) => {
			chrome.contextMenus.create({
				id: "uk-" + account.id.toString(),
				title: account.emailAddress,
				contexts: ["all"],
				parentId: "accountContextMenu",
			});
		});
	}

	if (!accountsUS) {
		console.error("Failed to find US accounts");
	} else {
		// Iterate over the US accounts array
		accountsUS.forEach((account) => {
			chrome.contextMenus.create({
				id: "us-" + account.id.toString(),
				title: account.emailAddress,
				contexts: ["all"],
				parentId: "usAccountContextMenu",
			});
		});
	}
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "parentContextMenu") {
		return;
	}

	// Check if the clicked item has the parent of accountContextMenu or usAccountContextMenu
	const parentId = ["accountContextMenu", "usAccountContextMenu"].includes(info.parentMenuItemId as string) ? info.parentMenuItemId : null;
	if (parentId) {
		// Retrieve account data from the correct storage key based on the parent menu ID
		const storageKey = parentId === "accountContextMenu" ? "frontendAccounts" : "frontendAccountsUS";
		const allAccounts: FrontendAccount[] = await frontendAccountStorage.get(storageKey);
		if (!allAccounts) {
			console.error("Failed to find accounts");
			return;
		}
		const selectedAccount = allAccounts.find((account) => {
			const accountMenuId = (parentId === "accountContextMenu" ? "uk-" : "us-") + account.id.toString();
			return accountMenuId === info.menuItemId;
		});

		// Send the entire account data
		if (selectedAccount) {
			const accountRegion: string = parentId === "accountContextMenu" ? "UK" : "US";
			const request: ContentRequest = {
				type: ContentRequestType.AutofillAccount,
				functionName: null,
				arguments: [accountRegion, selectedAccount]
			}

			await chrome.tabs.sendMessage(tab.id, request);

		} else {
			console.error("Could not find account with id: " + info.menuItemId);
		}
	}
});

function updateContextMenu() {
	chrome.contextMenus.remove("accountContextMenu", async () => {
		chrome.contextMenus.remove("usAccountContextMenu", async () => {
			await createAccountContextMenu();
		});
	});
}

frontendAccountStorage.watch({
	frontendAccounts: () => {
		updateContextMenu();
	},
	frontendAccountsUS: () => {
		updateContextMenu();
	}
});
