export enum ModalTypes {
	JsonEditor = "JSONEditor",
	SwitchAndSave= "SwitchAndSave",
	ProductQuery = "ProductQuery",
}
export enum ProductTypes {
	Frontals = "Frontals",
	CoffeeMachines = "CoffeeMachines",
	Cooking = "Cooking",
	Extraction = "Extraction",
	Laundry = "Laundry",
	Refrigeration = "Refrigeration",
	Sinks = "Sinks",
	'Small Domestic Appliances' = "Small Domestic Appliances",
	Dishwashers = "Dishwashers",
}

export enum ProductStatuses{
	Active = "Active",
	Born = "Born",
	Conception = "Conception",
	Gestation = "Gestation",
	Semiretired = "Semiretired",
	Retired = "Retired",
}
export enum oven_sub_categories {
	'BuiltUnderDoubleOvens'= "Built Under Double Ovens",
	'CompactOvens' = "Compact Ovens",
	'DoubleOvens' = "Double Ovens",
	'SingleOvens' = "Single Ovens",
	'CombinationWallOvens'	= "Combination Wall Ovens",
	'DoubleWallOvens' = "Double Wall Ovens",
	'SingleWallOvens' = "Single Wall Ovens",
}

export enum regions {
	UK = "com",
	US = "us",
}

export enum projectTier{
	live = "live",
	project0 = "project0",
	project1 = "project1",
	project2 = "project2",
	project3 = "project3",
	project4 = "project4",
	project5 = "project5",
	project6 = "project6",
	project7 = "project7",
	project8 = "project8",
	training = "training",
}


export interface ProductInterface {
	productId: number;
	productCode: string;
	productName: string;
	productStateHandle: string;
	productLongDescription: string;
	manufacturerPartNumber: string;
	manufacturer: string;
	listPrice: {
		net: number;
		gross: number;
	};
	costPerMeterSquared: {
		net: number | null;
		gross: number | null;
	};
	promoPrice: {
		net: number;
		gross: number;
	};
	priceMatches: {
		[key: string]: {
			retailer: string;
			price: {
				grossValue: number;
				netValue: number;
			} | any[];
		};
	};
	heightMm: number;
	depthMm: number;
	widthMm: number;
	minCustomLengthMm: number;
	packQuantity: number;
	requiredApertureHeightMm: number;
	productDetail: any;
	defaultImageId: string;
	defaultImageUrl: string;
	productShape: any;
	showOnSalesSystem: boolean;
	showOnTradeSalesSystem: boolean;
	showOnTradeWebsiteWrenTrade: boolean;
	showToCustomerServices: boolean;
	showOnStoreDesignFrontend: boolean;
	showOnRetailPlanner: boolean;
	showOnTradePlanner: boolean;
	productColour: {
		handle: string;
		name: string;
	};
	plannerColour: any;
	retailCategory: {
		handle: string;
		name: string;
	};
	retailSubCategory: {
		handle: string;
		name: string;
	};
	retailStore: {
		handle: string;
		name: string;
	};
	productStyle: any;
	productRange: any;
	productFlags: any[];
	productMaterial: any;
	showroomVisibility: any[];
	attributes: {
		[key: string]: string;
	};
	attributesIntegers: {
		[key: string]: number;
	};
	descriptions: {
		[key: string]: string;
	};
	productImages: {
		imageId: number;
	}[];
	productImageUrls: {
		imageUrl: string;
		image120Url: string;
		image440Url: string;
		image500Url: string;
		image800Url: string;
	}[];
	productRelations: {
		productId: number;
		relationTypeHandle: string;
		quantity: string;
		productCode: string;
		productDescription: string;
		retailCategoryHandle: string;
		retailSubCategoryHandle: string;
	}[];
	edgeColour: any;
	isExpressDelivery: boolean;
	technicalSpecificationUrl: string;
	availableCollections: string[];
	availableFrontalRangeCollectionHandles: string[];
	leadTimeDays: number;
	visibilities: {
		id: number;
		productId: number;
		roomTypeHandle: string;
		showOnSalesSystem: boolean;
		showOnRetailPlanner: boolean;
		showOnTradePlanner: boolean;
		showOnTradeSalesSystem: boolean;
		showOnTradeWebsiteWrenTrade: boolean;
		showToCustomerServices: boolean;
		showOnStoreDesignFrontend: boolean;
	}[];
	discountedOrderPrice: {
		net: number;
		gross: number;
	};
	formattedDiscountedOrderPrice: string;
	discountType: string;
	discountValue: {
		net: number;
		gross: number;
	};
}


export interface ProductApiResponse {
	filterCounts: any[];
	items: ProductInterface[];
	count: number;
	totalCount: number;
	offset: number;
	limit: number;
}


