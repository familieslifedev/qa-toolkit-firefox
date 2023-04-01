import { autofillUkFrontendAccount } from "~Utils/UtilsDomManipulation";

export const Content_inputFrontendAccount = async (request, sender, sendResponse) => {
  console.log("Content_inputFrontendAccount");
  autofillUkFrontendAccount(request.account);
};