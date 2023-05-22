import React, { useState } from "react";
import { stringify } from 'query-string/base';
import { convertPenceToPounds, isWithinRangeComparison } from "~Utils/Utils";
import { ProductInterface, ProductStatuses, ProductApiResponse } from "~Utils/Constants";

interface Props {
	hidden: boolean;
	onHiddenChange: (hidden: boolean) => void;
}

export default function SwitchAndSaveModal({ hidden, onHiddenChange }: Props): JSX.Element {
	const [inputProductSKU, setInputProductSKU] = useState<string>('');
	const [projectTier, setProjectTier] = useState<string>('project2');
	const [currentProduct, setCurrentProduct] = useState<ProductApiResponse>(null);
	const [sameCategoryProducts, setSameCategoryProducts] = useState<string>(null);
	const [sameSubCategoryProducts, setSameSubCategoryProducts] = useState<string>(null);
	const [alternativeProduct1, setAlternativeProduct1] = useState<ProductInterface>(null);
	const [alternative1PriceDifference, setAlternative1PriceDifference] = useState<number>(5);
	const [alternativeProduct2, setAlternativeProduct2] = useState<ProductInterface>(null);
	const [alternative2PriceDifference, setAlternative2PriceDifference] = useState<number>(10);
	const [currentAlternativeComparison, setCurrentAlternativeComparison] = useState<boolean>(true);

	enum inputEvents{
		productSKU = 'productSKU',
		alternative1Price = 'alternative1Price',
		alternative2Price = 'alternative2Price',
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
			default:
				break;
		}
	};


//AP.DW.AEG.114
	const getCurrentProduct = async (): Promise<any> => {
		const url = `https://feeder.${projectTier}.wrenkitchens.com/products`;

		const query = {
			productStateHandle: 'Active',
			productCode: inputProductSKU,
		};

		const response = await fetch(`${url}?${stringify(query)}`);
		const result = await response.json();
		if(result){
			await setCurrentProduct(result);
			console.log(result);
			await getAllSameTypeProducts(result);
		}

	};

	const getAllSameTypeProducts = async (results): Promise<any> => {
		const url = `https://feeder.${projectTier}.wrenkitchens.com/products`;
		const acceptableWidthDifference = 10;

		const query = {
			productStateHandle: ProductStatuses.Active,
			"retailCategory.handle": results.items[0]?.retailCategory.handle,
		};

		const response = await fetch(`${url}?${stringify(query)}`);
		const allSameTypeProducts = await response.json();

		if (!results || !results.items || results.items.length === 0) {
			console.log("No current product found");
			return;
		}

		const currentProduct = results.items[0];
		const currentManufacturer = currentProduct.manufacturer;
		const currentPromoPrice = currentProduct.promoPrice.gross;
		const currentWidthMm = currentProduct.widthMm;
		const currentSubCategoryHandle = currentProduct.retailSubCategory.handle;

		console.log('###############################################################################################')
		console.log(`%cCurrent Product`, "color:orange; font-weight:bold; font-size:30px;")
		console.log(currentProduct)
		console.log('###############################################################################################')


		let alternative1Products = allSameTypeProducts.items.filter(
			(product) =>
				product.manufacturer === currentManufacturer &&
				product.promoPrice.gross < currentPromoPrice * (1 - (alternative1PriceDifference / 100)) &&
				isWithinRangeComparison(product.widthMm, currentWidthMm, acceptableWidthDifference) &&
				product.retailSubCategory.handle === currentSubCategoryHandle
		);

		alternative1Products.sort(
			(a, b) => b.promoPrice.gross - a.promoPrice.gross
		);
		console.log('###############################################################################################')
		console.log(`%cAlternative 1`, "color:green; font-weight:bold; font-size:30px;")
		console.log('-----------------------------------------------------------------------------------------------')
		console.log(`%cFound ${alternative1Products.length} that matches the same manufacturer and are at least ${alternative1PriceDifference}% cheaper than current selection`, "color:green; font-weight:bold; font-size:20px;")
		console.log(alternative1Products)
		console.log('###############################################################################################')

		let alternative1 =
			alternative1Products.length > 0
				? alternative1Products[0]
				: null;

		if (alternative1 === null) {
			alternative1Products = allSameTypeProducts.items.filter(
				(product) =>
					product.manufacturer !== currentManufacturer &&
					product.promoPrice.gross < currentPromoPrice * (1 - (alternative1PriceDifference / 100)) &&
					isWithinRangeComparison(product.widthMm, currentWidthMm, acceptableWidthDifference) &&
					product.retailSubCategory.handle === currentSubCategoryHandle
			);

			alternative1Products.sort(
				(a, b) => b.promoPrice.gross - a.promoPrice.gross
			);
			console.log('-----------------------------------------------------------------------------------------------')
			console.log(`%cFound ${alternative1Products.length} that match different manufacturer and are at least ${alternative1PriceDifference}% cheaper than current selection`, "color:green; font-weight:bold; font-size:20px;")
			console.log(alternative1Products)
			console.log('###############################################################################################')


			alternative1 =
				alternative1Products.length > 0
					? alternative1Products[0]
					: null;
		}

		let alternative2Products = allSameTypeProducts.items.filter(
			(product) =>
				product.manufacturer !== currentManufacturer &&
				product.promoPrice.gross < (currentAlternativeComparison ? alternative1.promoPrice.gross * (1 - (alternative2PriceDifference / 100)) : currentPromoPrice * (1 - (alternative2PriceDifference / 100))) &&
				isWithinRangeComparison(product.widthMm, currentWidthMm, acceptableWidthDifference) &&
				product.retailSubCategory.handle === currentSubCategoryHandle
		);

		alternative2Products.sort(
			(a, b) => b.promoPrice.gross - a.promoPrice.gross
		);
		console.log('###############################################################################################')
		console.log(`%cAlternative 2`, "color:blue; font-weight:bold; font-size:30px;")
		console.log('-----------------------------------------------------------------------------------------------')
		console.log(`%cFound ${alternative2Products.length} that match different manufacturer and are at least ${alternative2PriceDifference}% cheaper than ${currentAlternativeComparison ? 'alternative 1': 'current Selection'}`, "color:green; font-weight:bold; font-size:20px;")
		console.log(alternative2Products)
		console.log('###############################################################################################')

		let alternative2 =
			alternative2Products.length > 0 ? alternative2Products[0] : null;

		if (alternative2 === null) {
			alternative2Products = allSameTypeProducts.items.filter(
				(product) =>
					product.manufacturer === currentManufacturer &&
					product.promoPrice.gross < (currentAlternativeComparison ? alternative1.promoPrice.gross * (1 - (alternative2PriceDifference / 100)) : currentPromoPrice * (1 - (alternative2PriceDifference / 100))) &&
					isWithinRangeComparison(product.widthMm, currentWidthMm, acceptableWidthDifference) &&
					product.retailSubCategory.handle === currentSubCategoryHandle
			);

			alternative2Products.sort(
				(a, b) => b.promoPrice.gross - a.promoPrice.gross
			);
			console.log('-----------------------------------------------------------------------------------------------')
			console.log(`%cFound ${alternative2Products.length} that match same manufacturer and are at least ${alternative2PriceDifference}% cheaper than ${currentAlternativeComparison ?  'alternative 1': 'current selection'}`, "color:green; font-weight:bold; font-size:20px;")
			console.log(alternative2Products)
			console.log('###############################################################################################')

			alternative2 =
				alternative2Products.length > 0
					? alternative2Products[0]
					: null;
		}

		// Set the state variables for alternative products
		await setAlternativeProduct1(alternative1);
		await setAlternativeProduct2(alternative2);

		if (!alternative1 && !alternative2) {
			console.log('No Recommended Alternatives Found', "color:red; font-weight:bold; font-size:20px;");
		} else {
			console.log('###############################################################################################')
			console.log(`%cRecommended Alternatives`, "color:red; font-weight:bold; font-size:30px;")
			console.log('-----------------------------------------------------------------------------------------------')
			alternative1 ? console.log('Recommended Alternative 1', alternative1) : console.log('Recommended Alternative 1', 'No Alternatives Found')
			console.log('-----------------------------------------------------------------------------------------------')
			alternative2 ? console.log('Recommended Alternative 2', alternative2) : console.log('Recommended Alternative 2', 'No Alternatives Found')
			console.log('-----------------------------------------------------------------------------------------------')

		}
	};


	function handleCheckChange (event) {
		setCurrentAlternativeComparison(event.target.checked)
	}



	return (
		<div className={`SNSEditorPanel ${hidden ? 'hidden' : ''}`}>
			<div className="SNSHeaderBar">
				<button className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</button>
				<label className="jsonEditorHeaderLabel">Switch and Save Comparator</label>
			</div>
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
						<p><b>Brand:</b>  {currentProduct?.items[0]?.manufacturer}</p>
						<p><b>SKU:</b>  {currentProduct?.items[0]?.productCode}</p>
						<p><b>Category:</b>  {currentProduct?.items[0]?.retailCategory.name}</p>
						<p><b>Sub Category:</b>  {currentProduct?.items[0]?.retailSubCategory.name}</p>
						<p><b>Price:</b> {currentProduct?.items[0]?.promoPrice?.gross ? `£${convertPenceToPounds(currentProduct.items[0]?.promoPrice.gross)}` : ''}</p>
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
						<p><b>Brand:</b> {alternativeProduct1?.manufacturer}</p>
						<p><b>SKU:</b> {alternativeProduct1?.productCode}</p>
						<p><b>Category:</b> {alternativeProduct1?.retailCategory.name}</p>
						<p><b>Sub Category:</b> {alternativeProduct1?.retailSubCategory.name}</p>
						<p><b>Price:</b>{" "}
							{alternativeProduct1?.promoPrice?.gross
								? `£${convertPenceToPounds(alternativeProduct1?.promoPrice.gross)}`
								: ""}
						</p>
						<p><b>Save:  </b>{alternativeProduct1?.promoPrice?.gross ? `£${convertPenceToPounds((Math.abs(currentProduct?.items[0]?.promoPrice.gross - alternativeProduct1?.promoPrice.gross)))}`
							: ""} </p>
						<p><b>Percent Difference: </b>
							{alternativeProduct1?.promoPrice?.gross && currentProduct?.items[0]?.promoPrice.gross
								? `${(Math.abs(currentProduct.items[0].promoPrice.gross - alternativeProduct1.promoPrice.gross) / currentProduct.items[0].promoPrice.gross * 100).toFixed(2)}%`
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
						<p><b>Brand:</b> {alternativeProduct2?.manufacturer}</p>
						<p><b>SKU:</b> {alternativeProduct2?.productCode}</p>
						<p><b>Category:</b> {alternativeProduct2?.retailCategory.name}</p>
						<p><b>Sub Category:</b> {alternativeProduct2?.retailSubCategory.name}</p>
						<p>
							<b>Price:</b>{" "}
							{alternativeProduct2?.promoPrice.gross
								? `£${convertPenceToPounds(alternativeProduct2?.promoPrice.gross)}`
								: ""}
						</p>
						<p><b>Save:  </b>{alternativeProduct2?.promoPrice?.gross ? `£${convertPenceToPounds((Math.abs(currentProduct?.items[0]?.promoPrice.gross - alternativeProduct2?.promoPrice.gross)))}`
							: ""} </p>
						<p><b>Percent Difference: </b>
							{alternativeProduct2?.promoPrice?.gross && (currentAlternativeComparison ? alternativeProduct1?.promoPrice.gross : currentProduct?.items[0]?.promoPrice.gross)
								? `${(Math.abs((currentAlternativeComparison ? alternativeProduct1.promoPrice.gross : currentProduct.items[0].promoPrice.gross) - alternativeProduct2.promoPrice.gross) / (currentAlternativeComparison ? alternativeProduct1.promoPrice.gross : currentProduct.items[0].promoPrice.gross) * 100).toFixed(2)}%`
								: ""}
						</p>

					</div>
				</div>

			</div>
			<div className="SNSFooter">
				<div className="flex-col space-y-0.5 alignItemsCenter">
					<label className="label-text">Product SKU</label>
					<input className="input input-sm input-bordered" type="text" value={inputProductSKU} onChange={(e) => handleInputChange(e, inputEvents.productSKU)} />
				</div>
				<div className="flex-col space-y-0.5 alignItemsCenter">
					<label className="label-text">Alternative 1 Price %</label>
					<input className="input input-sm input-bordered" type="number" value={alternative1PriceDifference} onChange={(e) => handleInputChange(e, inputEvents.alternative1Price)}/>
				</div>
				<div className="flex-col space-y-0.5 alignItemsCenter">
					<label className="label-text">Alternative 2 Price %</label>
					<input className="input input-sm input-bordered" type="number" value={alternative2PriceDifference} onChange={(e) => handleInputChange(e, inputEvents.alternative2Price)}/>
					<div className="flex space-x-0.5 alignItemsCenter">
						<input type="checkbox" className="toggle toggle-sm toggle-success" onChange={handleCheckChange} checked={currentAlternativeComparison} />
						<label className="label-text">Current / Alternative 1</label>
					</div>
				</div>
				<div className="flex-col space-y-0.5 alignItemsCenter">
					<label className="label-text">Run Comparison</label>
					<button className="btn btn-sm btn-primary " onClick={getCurrentProduct}> Compare </button>
				</div>
			</div>
		</div>
	);
}
