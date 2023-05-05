import { autofillUkFrontendAccount, autofillUsFrontendAccount } from "~Utils/UtilsDomManipulation";
import { writeToClipboard } from "~Utils/Utils";

export const Content_inputFrontendAccount = async (request, sender, sendResponse) => {
	try {
		request.accountRegion === "UK" ? await autofillUkFrontendAccount(request.account) : await autofillUsFrontendAccount(request.account);
		sendResponse({ success: true });
	} catch (error) {
		console.error('Error auto filling account:', error);
		sendResponse({ success: false, error: `Error auto filling account: ${error}` });
	}
};

export const Content_writeToClipboard = async (request, sender, sendResponse) => {
	try {
		await writeToClipboard(request.text);
		sendResponse({ success: true });
	} catch (error) {
		console.error('Error writing to clipboard:', error);
		sendResponse({ success: false, error: `Error writing to clipboard: ${error}` });
	}
};
