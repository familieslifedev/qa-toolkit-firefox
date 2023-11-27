import { randomInt } from "mathjs";

export function generateMobileNumber(isUK): string {

	if (isUK) {
		const prefix = "07";
		const min = 100000000;
		const max = 999999999;
		const mobileNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return String(prefix + mobileNumber);
	} else {
		const areaCode = generateAreaCode();
		const exchangeCode = generateRandomDigitsWithRange(3, 0, 9);
		const lineNumber = generateRandomDigitsWithRange(4, 0, 9);

		return `${areaCode}-${exchangeCode}-${lineNumber}`;
	}

	function generateAreaCode(): string {
		const tollFreeAreaCodes = ["800", "888", "877", "866", "855", "844", "833"];
		return tollFreeAreaCodes[randomInt(0, tollFreeAreaCodes.length)];
	}

	function generateRandomDigitsWithRange(length: number, min: number, max: number): string {
		let digits = "";

		for (let i = 0; i < length; i++) {
			digits += randomInt(min, max + 1);
		}

		return digits;
	}
}