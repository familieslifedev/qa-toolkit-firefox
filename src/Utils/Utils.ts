import { Request as BackgroundRequest, RequestType } from "../Services/Background/Request";
import { stringify } from "query-string/base";
import { FeederQueryType, projectTier, regions } from "~Utils/Constants";
import browser from "webextension-polyfill";

//Verify Link and open url - setting currentTab will open in the current tab, otherwise it will open in a new tab.
export async function openURL(url: string, tabId: number, newTab: boolean): Promise<void> {
	try {
		const response = await fetch(url);
		if (response.status === 200) {
			if (newTab) {
				await browser.tabs.create({ url: url });
			} else {
				await browser.tabs.update(tabId, { url: url });
			}
		} else {
			console.error(`Failed to fetch URL: ${url}`);
		}
	} catch (error) {
		throw error;
	}
}

//Copy from clipboard and return text, has to happen in a content script.
export async function copyFromClipboard(): Promise<string> {
	return await navigator.clipboard.readText();
}

//Write into clipboard, has to happen in a content script.
export async function writeToClipboard(toWrite: string): Promise<void> {
	if (!toWrite) {
		console.error("Missing string to write to clipboard");
		return;
	}

	await navigator.clipboard.writeText(toWrite);
}

//Convert json to html and formats them in a pretty printable way.
export const prettyPrintJson = {
	toHtml: (thing) => {
		const htmlEntities = (string) => {
			return string
				.replace(/&/g, "&amp;")
				.replace(/\\"/g, "&bsol;&quot;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");
		};

		const replacer = (match, p1, p2, p3, p4) => {
			const part = { indent: p1, key: p2, value: p3, end: p4 };
			const key = part.key && part.key.replace(/"([^"]+)":\s*/, "<span class=\"json-key\">\"$1\"</span>: ");
			const isBool = ["true", "false"].includes(part.value);
			const valSpan = /^"/.test(part.value) ? "<span class=\"json-string\">" : isBool ? "<span class=\"json-boolean\">" : "<span class=\"json-value\">";
			const indentHtml = part.indent || "";
			const keyHtml = part.key ? key : "";
			const valueHtml = part.value ? valSpan + part.value + "</span>" : "";
			const endHtml = part.end || "";
			return indentHtml + keyHtml + valueHtml + endHtml;
		};


		const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
		return htmlEntities(JSON.stringify(thing, null, 3))
			.replace(jsonLine, replacer);
	}
};

export async function injectDebugCommand(command: string, argsArray: any[]): Promise<any> {
	const request: BackgroundRequest = {
		functionName: command,
		type: RequestType.InjectConsoleCommand,
		arguments: argsArray
	};

	let result = await browser.runtime.sendMessage(request);
	if (!result) {
		throw new Error("injectDebugCommand: Failed get result");
	}

	return result;
}

export async function get2DJson(): Promise<any> {
	const request: BackgroundRequest = {
		functionName: "get2DJson",
		type: RequestType.Get2dJson,
		arguments: null
	};

	let result = await browser.runtime.sendMessage(request);
	if (!result) {
		throw new Error("get2DJson: Failed to get 2D JSON");
	}

	return result;
}

export async function get3DJson(): Promise<any> {
	const request: BackgroundRequest = {
		functionName: "get3DJson",
		type: RequestType.Get3dJson,
		arguments: null
	};

	const result = await browser.runtime.sendMessage(request);
	if (!result) {
		throw new Error("get3DJson: Failed to get 3D JSON");
	}

	return result;
}

export async function load2DJson(arg: any): Promise<void> {
	let argsArray: unknown[] = [arg];

	const command = arg?.startsWith("https://feeder") ?
		"set2DJsonByURL" : "set2DJson";
	argsArray[0] = arg;

	const request: BackgroundRequest = {
		functionName: command,
		type: RequestType.InjectConsoleCommand,
		arguments: argsArray
	};

	await browser.runtime.sendMessage(request);
}

export function convertPenceToPounds(int: number | null): string {
	return int === null ? "" : (int / 100).toFixed(2);
}
export function isWithinRangeComparison(value: number, target: number, range: number): boolean {
	const min = target - range;
	const max = target + range;
	return value >= min && value <= max;
}
export const feederQuery = async (
	queryType: FeederQueryType,
	environment: projectTier,
	region: regions,
	input?: string,
	campaignPhaseId?: number
): Promise<any> => {
	const url = `https://feeder.${environment === projectTier.live ? "" : `${environment}.`}wrenkitchens.${region}/${queryType}`;

	let query: any = {};

	if (queryType === FeederQueryType.Products) {
		query.campaignPhaseId = campaignPhaseId;
	}

	const isSKU = (input || "").includes(".");
	const isID = /^\d+$/.test(input || "");

	if (isSKU) {
		if (queryType === FeederQueryType.Products) {
			query.productCode = input;
		} else {
			query.unitDefinitionId = input;
		}
	} else if (isID) {
		if (queryType === FeederQueryType.Products) {
			query.productId = input;
		} else {
			query.unitDefinitionId = input;
		}
	}

	const response = await fetch(`${url}?${stringify(query)}`);
	try {
		const result = await response.json();
		if (result) {
			console.log( "Result: " + result);
			return result;
		}
	} catch (error) {
		return error;
	}
};
