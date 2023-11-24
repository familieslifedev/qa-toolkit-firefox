export const sendJsonToFeeder = async (JsonResult: any, planId: number, currentTabUrl: string): Promise<string> => {

	const currentProject = currentTabUrl.match(/(\.project[0-9])/)?.[0] || "";
	const url = `https://feeder${currentProject}.wrenkitchens.com/plan/save-plan-json`;
	const headers = {
		"accept": "application/json, text/plain, */*",
		"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
		"content-type": "application/x-www-form-urlencoded"
	};

	const filename = generateFeederJsonFilename(planId);

	const planJson = JSON.stringify(JsonResult);
	const body = `filename=${filename}&planJson=${encodeURIComponent(planJson)}`;
	const method = "POST";

	const storeJson = await fetch(url, {
		headers: headers,
		method: method,
		body: body
	});

	if (storeJson.ok) {
		let predictedUrl: string;
		predictedUrl = `https://feeder${currentProject}.wrenkitchens.com/plan/read-plan-json/${filename}`;
		return predictedUrl;
	}

	return "Failed to save JSON";
};

export const isJsonUrl = (data: any): boolean => data?.startsWith("https://feeder") && data?.endsWith(".json");

export const getJsonFromUrl = async (url: string): Promise<any> => {
	const [response] = await Promise.all([fetch(url)]);
	return response;
};

const generateFeederJsonFilename = (planId: number): string => {
	// +1 as months are zero-indexed
	const now: Date = new Date(), year: number = now.getFullYear(), month: number = now.getMonth() + 1,
		day: number = now.getDate(), hours: number = now.getHours(), minutes: number = now.getMinutes(),
		seconds: number = now.getSeconds();
	return `${planId}-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;
};
