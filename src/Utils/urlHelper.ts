export const isAccountPage = (url: string): boolean => {
	if (url == undefined) return false;

	const newUrl = new URL(url);

	// https://frontend.project1.wrenkitchens.com/accounts/account/view/1234567
	const splitPaths = newUrl.pathname.split("/");

	if (splitPaths.length < 3) return false;
	if (splitPaths[1] === "accounts" && splitPaths[2] === "account") return true;

	return false;
};
