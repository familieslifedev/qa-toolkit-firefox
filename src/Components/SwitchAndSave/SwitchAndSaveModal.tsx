import React, { useState } from "react";
import { stringify } from 'query-string/base';
import { convertPenceToPounds, get2DJson, isWithinRangeComparison } from "~Utils/Utils";
import { ProductInterface, ProductStatuses, ProductApiResponse } from "~Utils/Constants";
import { useStorage } from "@plasmohq/storage/dist/hook";
import { environmentArray } from "~Utils/componentArrays";
import { getPrice, isCheaperByPercentage, rules, RuleStatuses }
	from "~Components/SwitchAndSave/SwitchAndSaveRules";

interface Props {
	hidden: boolean;
	onHiddenChange: (hidden: boolean) => void;
}

export default function SwitchAndSaveModal({ hidden, onHiddenChange }: Props): JSX.Element {
	const [inputProductSKU, setInputProductSKU] = useState<string>('');
	const [environment, setEnvironment] = useStorage<string>('SNSEnvironment', '');
	const [currentProduct, setCurrentProduct] = useState<ProductApiResponse>(null);
	const [alternativeProduct1, setAlternativeProduct1] = useState<ProductInterface>(null);
	const [alternative1PriceDifference, setAlternative1PriceDifference] = useState<number>(5);
	const [alternativeProduct2, setAlternativeProduct2] = useState<ProductInterface>(null);
	const [alternative2PriceDifference, setAlternative2PriceDifference] = useState<number>(10);
	const [currentAlternativeComparison, setCurrentAlternativeComparison] = useState<boolean>(true);
	const [campaignPhaseId, setCampaignPhaseId] = useStorage<number>("SNSCampaignID",null);


	const [ruleStatusesAlt1, setRuleStatusesAlt1] = useStorage('ruleStatusesAlt1', {
		isSameBrand: { isActive: true, isHard: false, priority: 1 },
		isDifferentBrand: { isActive: false, isHard: false, priority: 2 },
		isSameColour: { isActive: true, isHard: false, priority: 3 },
		isWithinWidthRange: { isActive: true, isHard: true, priority: 4 },
		isSameFuelType: { isActive: false, isHard: false, priority: 5 },

	});

	const [ruleStatusesAlt2, setRuleStatusesAlt2] = useStorage('ruleStatusesAlt2', {
		isSameBrand: { isActive: false, isHard: false, priority: 1 },
		isDifferentBrand: { isActive: true, isHard: false, priority: 2 },
		isSameColour: { isActive: true, isHard: false, priority: 3 },
		isWithinWidthRange: { isActive: true, isHard: true, priority: 4 },
		isSameFuelType: { isActive: false, isHard: false, priority: 5 },

	});



	const handleRuleChangeAlt1 = (ruleName, key, value) => {
		setRuleStatusesAlt1(prevStatuses => ({
			...prevStatuses,
			[ruleName]: {
				...prevStatuses[ruleName],
				[key]: value,
			},
		}));
	};
	const handleRuleChangeAlt2 = (ruleName, key, value) => {
		setRuleStatusesAlt2(prevStatuses => ({
			...prevStatuses,
			[ruleName]: {
				...prevStatuses[ruleName],
				[key]: value,
			},
		}));
	};


	enum inputEvents{
		productSKU = 'productSKU',
		alternative1Price = 'alternative1Price',
		alternative2Price = 'alternative2Price',
		campaignPhaseId = 'campaignPhaseId'
	}


	const handleHidePanel = () => {
		onHiddenChange(true);
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, trigger: inputEvents): void => {
		switch (trigger) {
			case inputEvents.productSKU:
				setInputProductSKU(e.target.value);
				break;
			case inputEvents.alternative1Price:
				setAlternative1PriceDifference(e.target.valueAsNumber);
				break;
			case inputEvents.alternative2Price:
				setAlternative2PriceDifference(e.target.valueAsNumber);
				break;
			case inputEvents.campaignPhaseId:
				setCampaignPhaseId(e.target.valueAsNumber);
				break;
			default:
				break;
		}
	};

	const getPhaseId = async (): Promise<void> =>{
		const Json = await get2DJson();
		if (Json) {
			console.log(Json);
			await setCampaignPhaseId(Json.lock.campaignPhaseId)
		}
	}


//AP.DW.AEG.114
	const getCurrentProduct = async (): Promise<any> => {
		const url = `https://feeder.${environment ? `${environment}.` : ''}wrenkitchens.com/products`;

		const query = {
			productCode: inputProductSKU,
			campaignPhaseId: campaignPhaseId,
		};

		const response = await fetch(`${url}?${stringify(query)}`);
		const result = await response.json();
		if(result){
			await setCurrentProduct(result);
			console.log(result);
			await getAllSameTypeProducts(result);
		}

	};

	const getFilteredProducts = async (allSameTypeProducts, currentProduct, priceDifference, rulesStatuses: RuleStatuses, previousAlternative = null) => {
		if (!currentProduct) {
			console.log('No current product found');
			return [];
		}

		// Sort the rules based on priority
		const sortedRules = Object.entries(rulesStatuses)
			.sort(([, a], [, b]) => a.priority - b.priority);

		// Separate hard and soft rules
		const hardRules = sortedRules.filter(([, ruleStatus]) => ruleStatus.isActive && ruleStatus.isHard);
		const softRules = sortedRules.filter(([, ruleStatus]) => ruleStatus.isActive && !ruleStatus.isHard);

		console.log("Hard Rules:", hardRules);
		console.log("Soft Rules:", softRules);

		console.log("All Products Before Filtering:", allSameTypeProducts.items);

		let filteredProducts = allSameTypeProducts.items
			.filter((product) => {
				// Price comparison product could be either previous alternative or the current product
				let priceComparisonProduct = previousAlternative ? previousAlternative : currentProduct;

				let rulesApply = hardRules.every(([ruleName]) => rules[ruleName](product, currentProduct));  // Always compare with original product
				return rulesApply && isCheaperByPercentage(product, priceComparisonProduct, priceDifference);
			});

		console.log("Filtered Products After Hard Rules:", filteredProducts);

		for (const [ruleName] of softRules) {
			const intermediateFilteredProducts = filteredProducts.filter(product => rules[ruleName](product, currentProduct)); // Always compare with original product
			console.log(`Filtered Products After Rule ${ruleName}:`, intermediateFilteredProducts);

			// If this rule cannot be satisfied by any product, we stop here and return the products
			// that passed the last successful filtration.
			if (intermediateFilteredProducts.length === 0) {
				break;
			}

			filteredProducts = intermediateFilteredProducts;
		}

		// We want to return the most expensive product that matches the rules.
		filteredProducts.sort((a, b) => getPrice(b) - getPrice(a));

		return filteredProducts;
	}

	const getAllSameTypeProducts = async (results): Promise<any> => {
		const url = `https://feeder.${environment ? `${environment}.` : ''}wrenkitchens.com/products`;

		const query = {
			productStateHandle: ProductStatuses.Active,
			campaignPhaseId: campaignPhaseId,
			"retailCategory.handle": results.items[0]?.retailCategory.handle,
			"retailSubCategory.handle": results.items[0]?.retailSubCategory.handle,
		};

		const response = await fetch(`${url}?${stringify(query)}`);
		const allSameTypeProducts = await response.json();

		if (!results || !results.items || results.items.length === 0) {
			console.log("No current product found");
			return;
		}
		const currentProduct = results.items[0];
		let alternative1Products = await getFilteredProducts(allSameTypeProducts, currentProduct, alternative1PriceDifference, ruleStatusesAlt1);
		let alternative1 = (alternative1Products).length > 0 ? alternative1Products[0] : null;

		let alternative2 = null;
		if (!(currentAlternativeComparison && alternative1 === null)) {
			let alternative2Products = await getFilteredProducts(allSameTypeProducts, currentProduct, alternative2PriceDifference, ruleStatusesAlt2, alternative1);
			alternative2 = alternative2Products.length > 0 ? alternative2Products[0] : null;
		}

		await setAlternativeProduct1(alternative1);
		await setAlternativeProduct2(alternative2);
	}

	function handleCheckChange (event) {
		setCurrentAlternativeComparison(event.target.checked)
	}

	function handleEnvChange(event) {
		setEnvironment(event.target.value)
	}

	return (
		<div className={`SNSEditorPanel ${hidden ? 'hidden' : ''}`}>
			<div className="SNSHeaderBar">
				<button className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</button>
				<label className="jsonEditorHeaderLabel">Switch and Save Comparator</label>
			</div>
			<div className="SNSComparePanel">
				<div className="SNSMainContent">
					<div className="SNSCurrentProduct">
						<div>
							<img  src={currentProduct?.items[0]?.defaultImageUrl}
								  alt={currentProduct?.items[0]?.defaultImageId}
								  className = "SNSProductImage"
							/>
						</div>
						<div className={"SNSInnerRight"}>
							<h1><b>Current Product</b></h1>
							<p><b>Product:</b>  {currentProduct?.items[0]?.productName}</p>
							<p><b>Status:</b> {currentProduct?.items[0]?.productStateHandle}</p>
							<p><b>Brand:</b>  {currentProduct?.items[0]?.manufacturer}</p>
							<p><b>SKU:</b>  {currentProduct?.items[0]?.productCode}</p>
							<p><b>Category:</b>  {currentProduct?.items[0]?.retailCategory.name}</p>
							<p><b>Sub Category:</b>  {currentProduct?.items[0]?.retailSubCategory.name}</p>
							<p>
								<b>Price:</b>{" "}
								{currentProduct?.items[0] && currentProduct.items[0].promoPrice?.gross && currentProduct.items[0].discountedOrderPrice?.gross
									? <>
										<s>£{convertPenceToPounds(currentProduct.items[0].promoPrice.gross)}</s>{" "}
										£{convertPenceToPounds(getPrice(currentProduct.items[0]))}
									</>
									: currentProduct?.items[0]
										? `£${convertPenceToPounds(getPrice(currentProduct.items[0]))}`
										: ""}
							</p>
						</div>
					</div>
					<div className="SNSAlternativeProducts">
						<div className="SNSInnerLeft">
							<img  src={alternativeProduct1?.defaultImageUrl}
								  alt={alternativeProduct1?.defaultImageId}
								  className = "SNSProductImage"
							/>
							<h1><b>Alternative One</b></h1>
							<p><b>Product:</b> {alternativeProduct1?.productName}</p>
							<p><b>Status:</b> {alternativeProduct1?.productStateHandle}</p>
							<p><b>Brand:</b> {alternativeProduct1?.manufacturer}</p>
							<p><b>SKU:</b> {alternativeProduct1?.productCode}</p>
							<p><b>Category:</b> {alternativeProduct1?.retailCategory.name}</p>
							<p><b>Sub Category:</b> {alternativeProduct1?.retailSubCategory.name}</p>
							<p>
								<b>Price:</b>{" "}
								{alternativeProduct1 && alternativeProduct1.promoPrice?.gross && alternativeProduct1.discountedOrderPrice?.gross
									? <>
										<s>£{convertPenceToPounds(alternativeProduct1.promoPrice.gross)}</s>{" "}
										£{convertPenceToPounds(getPrice(alternativeProduct1))}
									</>
									: alternativeProduct1
										? `£${convertPenceToPounds(getPrice(alternativeProduct1))}`
										: ""}
							</p>
							<p>
								<b>Save:  </b>
								{alternativeProduct1 && currentProduct?.items[0]
									? `£${convertPenceToPounds(Math.abs(getPrice(currentProduct.items[0]) - getPrice(alternativeProduct1)))}`
									: ""}
							</p>
							<p>
								<b>Percent Difference: </b>
								{alternativeProduct1 && currentProduct?.items[0]
									? `${(Math.abs(getPrice(currentProduct.items[0]) - getPrice(alternativeProduct1)) / getPrice(currentProduct.items[0]) * 100).toFixed(2)}%`
									: ""}
							</p>


						</div>
						<div className="SNSInnerRight">
							<img  src={alternativeProduct2?.defaultImageUrl}
								  alt={alternativeProduct2?.defaultImageId}
								  className = "SNSProductImage"

							/>
							<h1><b>Alternative Two</b></h1>
							<p><b>Product:</b> {alternativeProduct2?.productName}</p>
							<p><b>Status:</b> {alternativeProduct2?.productStateHandle}</p>
							<p><b>Brand:</b> {alternativeProduct2?.manufacturer}</p>
							<p><b>SKU:</b> {alternativeProduct2?.productCode}</p>
							<p><b>Category:</b> {alternativeProduct2?.retailCategory.name}</p>
							<p><b>Sub Category:</b> {alternativeProduct2?.retailSubCategory.name}</p>
							<p>
								<b>Price:</b>{" "}
								{alternativeProduct2 && alternativeProduct2.promoPrice?.gross && alternativeProduct2.discountedOrderPrice?.gross
									? <>
										<s>£{convertPenceToPounds(alternativeProduct2.promoPrice.gross)}</s>{" "}
										£{convertPenceToPounds(getPrice(alternativeProduct2))}
									</>
									: alternativeProduct1
										? `£${convertPenceToPounds(getPrice(alternativeProduct2))}`
										: ""}
							</p>
							<p>
								<b>Save:  </b>
								{alternativeProduct2 && currentProduct?.items[0]
									? `£${convertPenceToPounds(Math.abs(getPrice(currentProduct.items[0]) - getPrice(alternativeProduct2)))}`
									: ""}
							</p>
							<p>
								<b>Percent Difference: </b>
								{alternativeProduct2 && (currentAlternativeComparison ? alternativeProduct1 : currentProduct?.items[0])
									? `${(Math.abs(getPrice(currentAlternativeComparison ? alternativeProduct1 : currentProduct.items[0]) - getPrice(alternativeProduct2)) / getPrice(currentAlternativeComparison ? alternativeProduct1 : currentProduct.items[0]) * 100).toFixed(2)}%`
									: ""}
							</p>


						</div>
					</div>

				</div>
				<div className="SNSRulesBar">
					<div className="flex-col space-y-0.5 alignItemsCenter ">
						<label className="label-text font-bold">Product SKU</label>
						<input className="input input-sm input-bordered" type="text" value={inputProductSKU} onChange={(e) => handleInputChange(e, inputEvents.productSKU)} />
					</div>
					<div className="flex flex-row alignItemsCenter">
					<div className="flex-col space-y-0.5 alignItemsCenter">
						<label className="label-text font-bold">Alternative 1 Price %</label>
						<input className="input input-xs input-bordered w-14" type="number" value={alternative1PriceDifference} onChange={(e) => handleInputChange(e, inputEvents.alternative1Price)}/>
					</div>
					<div className="flex-col space-y-0.5 alignItemsCenter">
						<label className="label-text font-bold">Alternative 2 Price %</label>
						<input className="input input-xs input-bordered w-14" type="number" value={alternative2PriceDifference} onChange={(e) => handleInputChange(e, inputEvents.alternative2Price)}/>
						<div className="flex space-x-0.5 alignItemsCenter">
							<input type="checkbox" className="toggle toggle-sm toggle-success" onChange={handleCheckChange} checked={currentAlternativeComparison} />
							<label className="label-text">Current/Alt</label>
						</div>
					</div>
					</div>
					<div className="flex flex-row alignItemsCenter">
						<div className="flex-col space-y-0.5 alignItemsCenter">
							<label className="label-text font-bold">Environment</label>
							<select onChange={handleEnvChange} value={environment}  className="select select-xs select-bordered">
								{environmentArray.map(environmentArray => (
									<option key={environmentArray.Name} value={environmentArray.Code}>
										{environmentArray.Name}
									</option>
								))}
							</select>
						</div>
						<div className="flex-col space-y-0.5 alignItemsCenter">
							<label className="label-text font-bold">Campaign Phase Id</label>
							<div className="input-group">
								<input className="input input-xs input-bordered w-14" type="number" value={campaignPhaseId} onChange={(e) => handleInputChange(e, inputEvents.campaignPhaseId)} />
								<button className="btn btn-xs" title="Get from current plan" onClick={getPhaseId}>From plan</button>
							</div>
						</div>
					</div>
					<label className="label label-text self-center font-bold"> Alt 1 Rules </label>
					<form className="form-control">
						{Object.entries(ruleStatusesAlt1).map(([ruleName, { isActive, isHard, priority }]) => (
							<div key={ruleName}>
								<h2 className="font-bold" >{ruleName}</h2>
								<div  className="SNSRuleEntry">
									<label>
										Active:&nbsp;
										<input type="checkbox" checked={isActive} onChange={e => handleRuleChangeAlt1(ruleName, 'isActive', e.target.checked)} />
									</label>
									<label>
										Hard Rule:&nbsp;
										<input type="checkbox" checked={isHard} onChange={e => handleRuleChangeAlt1(ruleName, 'isHard', e.target.checked)} />
									</label>
									<label>
										Priority:&nbsp;
										<input type="number" min="1" className="input input-bordered input-xs w-14" value={priority} onChange={e => handleRuleChangeAlt1(ruleName, 'priority', Number(e.target.value))} />
									</label>
								</div>
							</div>
						))}
					</form>
					<label className="label label-text self-center font-bold"> Alt 2 Rules </label>
					<form className="form-control">
						{Object.entries(ruleStatusesAlt2).map(([ruleName, { isActive, isHard, priority }]) => (
							<div key={ruleName}>
								<h2 className="font-bold" >{ruleName}</h2>
								<div  className="SNSRuleEntry">
									<label>
										Active:&nbsp;
										<input type="checkbox" checked={isActive} onChange={e => handleRuleChangeAlt2(ruleName, 'isActive', e.target.checked)} />
									</label>
									<label>
										Hard Rule:&nbsp;
										<input type="checkbox" checked={isHard} onChange={e => handleRuleChangeAlt2(ruleName, 'isHard', e.target.checked)} />
									</label>
									<label>
										Priority:&nbsp;
										<input type="number" min="1" className="input input-bordered input-xs w-14" value={priority} onChange={e => handleRuleChangeAlt2(ruleName, 'priority', Number(e.target.value))} />
									</label>
								</div>
							</div>
						))}
					</form>
					<div className="flex-col space-y-0.5 alignItemsCenter mt-4 w-full">
						<button className="btn btn-sm btn-primary w-full" onClick={getCurrentProduct}> Compare </button>
					</div>
				</div>
			</div>
		</div>
	);
}
