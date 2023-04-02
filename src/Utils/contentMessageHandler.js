import { autofillUkFrontendAccount } from "~Utils/UtilsDomManipulation";
import { writeToClipboard } from "~Utils/Utils";

export const Content_inputFrontendAccount = async (request, sender, sendResponse) => {
  await autofillUkFrontendAccount(request.account);
};


export const Content_writeToClipboard = async (request, sender, sendResponse) => {
  await writeToClipboard(request.text);
}