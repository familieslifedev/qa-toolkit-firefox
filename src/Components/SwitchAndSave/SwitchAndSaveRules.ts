import { isWithinRangeComparison } from "~Utils/Utils";

export interface RuleStatus {
	isActive: boolean;
	isHard: boolean;
	priority: number;
}

export interface RuleStatuses {
	[ruleName: string]: RuleStatus;
}

export const rules = {
	isSameSubCategory: (product, currentProduct) => product.retailSubCategory.handle === currentProduct.retailSubCategory.handle,
	isSameBrand: (product, currentProduct) => product.manufacturer === currentProduct.manufacturer,
	isDifferentBrand: (product, currentProduct) => product.manufacturer !== currentProduct.manufacturer,
	isSameColour: (product, currentProduct) => product.productColour.handle === currentProduct.productColour.handle,
	isWithinWidthRange: (product, currentProduct) => isWithinRangeComparison(product.widthMm, currentProduct.widthMm, 50),
	isWithinHeightRange: (product, currentProduct) => isWithinRangeComparison(product.heightMm, currentProduct.heightMm, 50),
	isSameDoorSplit: (product, currentProduct) => product.attributes["Door Split"] === currentProduct.attributes["Door Split"],
	isSameFuelType: (product, currentProduct) => {
		if (!currentProduct.attributes["Fuel type"] || !product.attributes["Fuel type"]) {
			return false;
		}

		return product.attributes["Fuel type"] === currentProduct.attributes["Fuel type"];
	},

};

export function isCheaperByPercentage(product: any, comparisonProduct: any, percentageDifference: number): boolean {
	let comparisonPrice = comparisonProduct.discountedOrderPrice?.gross ?? comparisonProduct.promoPrice?.gross;
	let productPrice = product.discountedOrderPrice?.gross ?? product.promoPrice?.gross;

	if (comparisonPrice === undefined || productPrice === undefined) {
		console.log("comparisonPrice or productPrice is undefined");
		return false;
	}

	return productPrice < comparisonPrice * (1 - percentageDifference / 100);
}




export function getPrice(product) {
	if (!product) {
		return null;
	}

	return product.discountedOrderPrice?.gross ?? product.promoPrice.gross;
}






