
export const sendJsonToFeeder = async (JsonResult: any, planId: number, currentTabUrl: string): Promise<string> => {

    const currentProject = currentTabUrl.match(/(\.project[0-9])/)?.[0] || '';
    const url = `https://feeder${currentProject}.wrenkitchens.com/plan/save-plan-json`;
    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded",
    };
    
    const filename = generateFeederJsonFilename(planId);

    const planJson =  JSON.stringify(JsonResult);
    const body = `filename=${filename}&planJson=${encodeURIComponent(planJson)}`;
    const method = "POST";

    const storeJson = await fetch(url, {
        headers: headers,
        method: method,
        body: body
    });

    if (storeJson.ok) {
        const predictedUrl = `https://feeder${currentProject}.wrenkitchens.com/plan/read-plan-json/${filename}`;
        return predictedUrl;
    }

    return "Failed to save JSON";
}

const generateFeederJsonFilename = (planId: number): string => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1; // +1 as months are zero-indexed
    const day: number = now.getDate();
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    const seconds: number = now.getSeconds();
    const filename: string = `${planId}-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;

    return filename;
}
