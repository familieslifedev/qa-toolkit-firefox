import { isWithinRangeComparison } from "~Utils/Utils";



// Define the type for a single rule status
export interface RuleStatus {
	isActive: boolean;
	isHard: boolean;
	rank: number;
}

// Define the type for the ruleStatuses state
export interface RuleStatuses {
	[ruleName: string]: RuleStatus;
}

const acceptableWidthDifference = 5;


const softRules = {
	isSameManufacturer: (product, currentProduct) => product.manufacturer === currentProduct.manufacturer,
	isWithinPriceRange: (product, currentProduct, priceDifference) => product.promoPrice.gross < currentProduct * (1 - (priceDifference / 100)),
};

const hardRules = {
	isSameRetailCategory: (product, currentProduct) => product.retailCategory.handle === currentProduct.retailCategory.handle,
	isWithinWidthRange: (product, currentProduct) => isWithinRangeComparison(product.widthMm, currentProduct.widthMm, acceptableWidthDifference),
	isSameSubCategory: (product, currentProduct) => product.retailSubCategory.handle === currentProduct.retailSubCategory.handle,
};

