import React, { useState } from "react";
import Draggable from "react-draggable";
import { convertPenceToPounds, feederQuery, get2DJson } from "~Utils/Utils";
import { FeederQueryType, ProductInterface, projectTier, regions, UnitInterface } from "~Utils/Constants";
import { getPrice } from "~Components/SwitchAndSave/SwitchAndSaveRules";

enum tabs {
	Product,
	Unit,
	Range,
}

interface UserInputs {
	productQueryInput: string;
	unitQueryInput: string;
	environment: projectTier;
	region: regions;
	campaignPhaseId: number;
}

interface Props {
	hidden: boolean;
	onHiddenChange: (hidden: boolean) => void;
}

export default function ProductQuery({ hidden, onHiddenChange }: Props): JSX.Element {
	const [activeTab, setActiveTab] = useState<tabs>(tabs.Product);
	const [productQueryResult, setProductQueryResult] = useState<ProductInterface>();
	const [unitQueryResult, setUnitQueryResult] = useState<UnitInterface>();

	const [userInputs, setUserInputs] = useState<UserInputs>({
		productQueryInput: "",
		unitQueryInput: "",
		environment: projectTier.project0,
		region: regions.UK,
		campaignPhaseId: 255
	});

	const [currentImageIndex, setCurrentImageIndex] = useState(0);


	const handleHidePanel = () => {
		onHiddenChange(true);
	};

	const handleTabClick = (tabName: tabs) => {
		setActiveTab(tabName);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setUserInputs({
			...userInputs,
			[name]: value
		});
	};

	const getPhaseId = async (): Promise<void> => {
		const Json = await get2DJson();
		if (Json) {
			console.log(Json);
			setUserInputs({
				...userInputs,
				campaignPhaseId: Json.lock.campaignPhaseId
			});
		}
	};

	async function handleProductQuery() {
		if (!userInputs.productQueryInput) return;
		const searchResponse = await feederQuery(FeederQueryType.Products, userInputs.environment, userInputs.region, userInputs.productQueryInput, userInputs.campaignPhaseId);
		if (searchResponse) {
			console.log("ProductQuery: ", searchResponse);
			setProductQueryResult(searchResponse.items[0]);
		} else {
			console.log("ProductQuery: No results");
		}
	}

	const handlePriceQuery = () => {
		if (productQueryResult && productQueryResult?.promoPrice?.gross && productQueryResult?.discountedOrderPrice?.gross) {
			return (
				<>
					<b>Price:</b>
					<s>{userInputs.region === regions.US ? "$" : "£"}{convertPenceToPounds(productQueryResult?.promoPrice.gross)}</s> £{convertPenceToPounds(getPrice(productQueryResult))}
				</>
			);
		} else if (productQueryResult) {
			return (
				<>
					<b>Price:</b> {userInputs.region === regions.US ? "$" : "£"}{convertPenceToPounds(getPrice(productQueryResult))}
				</>
			);
		} else {
			return null;
		}
	};

	const handleImageChange = (direction: "next" | "prev") => {
		const lastIndex = productQueryResult?.productImageUrls.length - 1;

		if (direction === "next") {
			setCurrentImageIndex(currentImageIndex < lastIndex ? currentImageIndex + 1 : 0);
		} else {
			setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : lastIndex);
		}
	};

	const generatePimLink = (): string => {
		return `https://frontend.${userInputs.environment === projectTier.live ? "" : userInputs.environment + "."}wrenkitchens.${userInputs.region}/pim/product/view/${productQueryResult?.productCode}#details_tab`;
	};

	const generatePimLinkUnit = (): string => {
		return `https://frontend.${userInputs.environment === projectTier.live ? "" : userInputs.environment + "."}wrenkitchens.${userInputs.region}/pim/unit/view/${unitQueryResult?.unitDefinitionId}`;
	};


	function displayProductQueryResults(): JSX.Element {
		if (productQueryResult) {
			return (
				<div className="productQueryResults">
					<div className="ProductQueryTopSection">
						<div className="productQueryImageContainer">
							<button className="productQueryImageCycleButton productQueryImageCycleButtonLeft"
									onClick={() => handleImageChange("prev")}>←
							</button>
							<div className="productQueryImageContainer">
								<img src={
									(productQueryResult?.productImageUrls && productQueryResult.productImageUrls[currentImageIndex]?.image500Url)
										? productQueryResult.productImageUrls[currentImageIndex]?.image500Url
										: ""}
									 alt="Product" />
							</div>
							<button className="productQueryImageCycleButton productQueryImageCycleButtonRight"
									onClick={() => handleImageChange("next")}>→
							</button>
						</div>
						<div className="flex-col">
							<p><b>Product Name:</b> {productQueryResult?.productName || "N/a"}</p>
							<p><b>Product SKU:</b> {productQueryResult?.productCode || "N/a"}</p>
							<p><b>Product ID:</b> {productQueryResult?.productId || "N/a"} </p>
							<p><b>Brand:</b> {productQueryResult?.manufacturer || "N/a"}</p>
							<p>{handlePriceQuery()}</p>
							<p><b>Colour: </b> {productQueryResult?.productColour?.name || "N/a"}</p>
							<p><b>Dimensions: </b> H{productQueryResult?.heightMm || "N/a"}mm
								W{productQueryResult?.widthMm || "N/a"}mm D{productQueryResult?.depthMm || "N/a"}mm </p>
							<p><b>Status: </b> {productQueryResult?.productStateHandle || "N/a"}</p>
							<p><b>Retail Store: </b> {productQueryResult?.retailStore?.name || "N/a"}</p>
							<p><b>Retail Category: </b> {productQueryResult?.retailCategory?.name || "N/a"}</p>
							<p><b>Retail Sub-Category: </b> {productQueryResult?.retailSubCategory?.name || "N/a"}</p>
							<p><b>Technical Specs: </b> {productQueryResult?.technicalSpecificationUrl ? (
								<a className="link link-accent" target="_blank"
								   href={productQueryResult.technicalSpecificationUrl}>
									{productQueryResult.technicalSpecificationUrl}
								</a>
							) : (
								"N/a"
							)}</p>
							<p><b>PIM Link: </b> <a className="link link-accent" target="_blank"
													href={generatePimLink()}>Click Here</a></p>
						</div>
					</div>

					<div className="ProductQueryMiddleSection">
						{productQueryResult && Object.keys(productQueryResult?.descriptions).map((key, index) => (
							<p key={index}
							   dangerouslySetInnerHTML={{ __html: `${key}: ${productQueryResult?.descriptions[key]}` }}></p>
						))}
					</div>
					<div className="ProductQueryBottomSection">
						<div className="ProductAttributesSection">
							<div className="productAttributeBorderRight">
								<h1><b>Product Attributes: </b></h1>
								{productQueryResult && Object.keys(productQueryResult?.attributes)
									.sort((a, b) => a.localeCompare(b)) // So3554rt keys alphabetically
									.map((key, index) => (
										<p key={index}>
											<b>{key}:</b> {productQueryResult?.attributes[key]}
										</p>
									))}
							</div>
						</div>
						<div className="ProductAttributesSection">
							<h1><b>Product Hidden In: </b></h1>
							{productQueryResult?.showroomVisibility &&
								[...productQueryResult.showroomVisibility]
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((item, index) => (
										<div key={index}>
											<p><b>{item.name}:</b> {item.availability}</p>
										</div>
									))}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="productQueryResults">
					<h1>No Results</h1>
				</div>
			);
		}
	}

	function formatRoomTypeHandle(input: string): string {
		// function to handle the formatting of the room type handle for image url in wren static, BEDROOM_2022 -> Bedroom, kitchens -> Kitchen
		if (!input) return "";

		//This allows further parsing of the BEDROOM_2022 handle
		const firstPart = input.split("_")[0];

		//this capitalises the first letter and lowercases the rest
		let formattedString = firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();

		//This removes the 's' from the end of the string if it exists (roomtype for kitchen needs to be Kitchens)
		if (formattedString.endsWith("s")) {
			formattedString = formattedString.slice(0, -1);
		}

		return formattedString;
	}

	async function handleUnitQuery() {
		if (!userInputs.unitQueryInput) return;
		const searchResponse = await feederQuery(FeederQueryType.Units, userInputs.environment, userInputs.region, userInputs.unitQueryInput);
		if (searchResponse) {
			console.log("ProductQuery: ", searchResponse);
			setUnitQueryResult(searchResponse[0]);
		} else {
			console.log("ProductQuery: No results");
		}
	}

	const generateImageSrc = (): string => {
		if (unitQueryResult && unitQueryResult.unitId) {
			if (unitQueryResult.hingeOptions.includes("right")) {
				return `https://project-static.wrenkitchens.com/planner/images/units/${formatRoomTypeHandle(unitQueryResult.roomTypeHandle)}/new/${unitQueryResult.unitDefinitionId}-rh.png`;
			} else if (unitQueryResult.hingeOptions.includes("left")) {
				return `https://project-static.wrenkitchens.com/planner/images/units/${formatRoomTypeHandle(unitQueryResult.roomTypeHandle)}/new/${unitQueryResult.unitDefinitionId}-lh.png`;
			}
			return `https://project-static.wrenkitchens.com/planner/images/units/${formatRoomTypeHandle(unitQueryResult.roomTypeHandle)}/new/${unitQueryResult.unitDefinitionId}.png`;
		}
		return "";
	};

	const imageSrc = generateImageSrc();

	function displayUnitQueryResults(): JSX.Element {
		if (unitQueryResult) {
			return (
				<div className="unitQueryResults">
					<div className="ProductQueryTopSection">
						<div className="productQueryImageContainer">
							{imageSrc ? (
								<img src={imageSrc} alt="Unit" />
							) : null}
						</div>
						<div className="flex-col">
							<p><b>Unit Description: </b>{unitQueryResult?.unitDescription || "N/a"}</p>
							<p><b>Unit Type: </b>{unitQueryResult?.unitType || "N/a"}</p>
							<p><b>Unit ID: </b>{unitQueryResult?.unitId || "N/a"}</p>
							<p><b>Unit Definition: </b>{unitQueryResult?.unitDefinitionId || "N/a"}</p>
							<p><b>Status: </b>{unitQueryResult?.availability || "N/a"}</p>
							<p><b>Room Type: </b>{unitQueryResult?.roomTypeHandle || "N/a"}</p>
							<p><b>Dimensions: </b>H{unitQueryResult?.heightMm || "N/a"}mm
								W{unitQueryResult?.widthMm || "N/a"}mm D{unitQueryResult?.depthMm || "N/a"}mm </p>
							<p><b>Category: </b>{unitQueryResult?.category || "N/a"}</p>
							<p><b>Sub-Category: </b>{unitQueryResult?.subCategory || "N/a"}</p>
							<p><b>Unit Configuration: </b>{unitQueryResult?.unitConfiguration || "N/a"}</p>
							<p><b>Hinge Options: </b>{unitQueryResult.hingeOptions.join(", ")} </p>
							<p><b>PIM Link: </b> <a className="link link-accent" target="_blank"
													href={generatePimLinkUnit()}>Click Here</a></p>
						</div>
					</div>
					<div className="ProductQueryMiddleSection">
						<div className="flex flex-row ">
							<div className="ProductAttributesSection productAttributeBorderRight">
								<h1><b>Unit Attributes: </b></h1>
								{unitQueryResult && Object.keys(unitQueryResult?.attributes)
									.sort((a, b) => a.localeCompare(b)) // Sort keys alphabetically
									.map((key, index) => (
										<p key={index}>
											<b>{key}:</b> {unitQueryResult?.attributes[key]}
										</p>
									))}
							</div>
							<div className="ProductAttributesSection">
								<h1><b>Availiable Collections: </b></h1>
								{unitQueryResult?.availableCollections &&
									[...unitQueryResult.availableCollections]
										.sort((a, b) => a.localeCompare(b))
										.map((item, index) => (
											<div key={index}>
												<p><b>{item}</b></p>
											</div>
										))}
							</div>
						</div>
					</div>
					<div className="ProductQueryBottomSection">
						<div className="ProductAttributesSection">
							<h1><b>Unit Hidden In Showrooms: </b></h1>
							{unitQueryResult?.showroomVisibility &&
								[...unitQueryResult.showroomVisibility]
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((item, index) => (
										<div key={index}>
											<p><b>{item.name}:</b> {item.availability}</p>
										</div>
									))}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="productQueryResults">
					<h1>No Results</h1>
				</div>
			);
		}
	}

	return (
		<Draggable handle="#ProductQueryHeaderBar">
			<div className={`ProductQueryPanel pane ${hidden ? "hidden" : ""}`}>

				<div id="ProductQueryHeaderBar" className="ProductQueryHeaderBar handle">
					<label className="jsonEditorHeaderLabel">Product Query</label>
				</div>

				<label className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</label>
				<div className="tabs modalTabs">
					<h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Product ? "tab-active" : ""}`}
						onClick={() => handleTabClick(tabs.Product)}> Product Query </h1>
					<h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Unit ? "tab-active" : ""}`}
						onClick={() => handleTabClick(tabs.Unit)}> Unit Query </h1>
					<h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Range ? "tab-active" : ""}`}
						onClick={() => handleTabClick(tabs.Range)}> Range Query </h1>
				</div>

				<div className="tabContentContainer">
					<div className={`tabContent ${activeTab === tabs.Product ? "active" : ""}`}>
						<div className="productQueryContainer">
							<div className="productQueryContentLeft">
								{displayProductQueryResults()}
							</div>
							<div className="productQueryContentRight">
								<div className="flex-col space-y-0.5 alignItemsCenter ">
									<label className="label-text font-bold">Product SKU or ID</label>
									<input
										name="productQueryInput"
										className="input input-sm input-bordered"
										type="text"
										value={userInputs.productQueryInput}
										onChange={handleInputChange}
									/>
								</div>
								<div className="flex flex-row alignItemsCenter">
									<div className="flex-col space-y-0.5 alignItemsCenter">
										<label className="label-text font-bold">Environment</label>
										<select
											name="environment"
											onChange={handleInputChange}
											value={userInputs.environment}
											className="select select-xs select-bordered"
										>
											{Object.keys(projectTier).map(key => (
												<option key={key} value={projectTier[key]}>
													{key}
												</option>
											))}
										</select>
									</div>
									<div className="flex-col space-y-0.5 alignItemsCenter">
										<label className="label-text font-bold">Region</label>
										<select
											name="region"
											onChange={handleInputChange}
											value={userInputs.region}
											className="select select-xs select-bordered"
										>
											{Object.keys(regions).map(key => (
												<option key={key} value={regions[key]}>
													{key}
												</option>
											))}
										</select>
									</div>
									<div className="flex-col space-y-0.5 alignItemsCenter">
										<label className="label-text font-bold">Campaign Phase Id</label>
										<div className="input-group">
											<input
												name="campaignPhaseId"
												className="input input-xs input-bordered w-14"
												type="number"
												value={userInputs.campaignPhaseId}
												onChange={handleInputChange}
											/>
											<button className="btn btn-xs" title="Get from current plan"
													onClick={getPhaseId}>From plan
											</button>
										</div>
									</div>
								</div>
								<button className="btn btn-sm btn-primary" onClick={handleProductQuery}>Search</button>
							</div>
						</div>
					</div>
					<div className={`tabContent ${activeTab === tabs.Unit ? "active" : ""}`}>
						<div className="productQueryContainer">
							<div className="productQueryContentLeft">
								{displayUnitQueryResults()}
							</div>
							<div className="productQueryContentRight">
								<div className="flex-col space-y-0.5 alignItemsCenter ">
									<label className="label-text font-bold">Unit ID: </label>
									<input
										name="unitQueryInput"
										className="input input-sm input-bordered"
										type="text"
										value={userInputs.unitQueryInput}
										onChange={handleInputChange}
									/>
								</div>
								<div className="flex flex-row alignItemsCenter">
									<div className="flex-col space-y-0.5 alignItemsCenter">
										<label className="label-text font-bold">Environment</label>
										<select
											name="environment"
											onChange={handleInputChange}
											value={userInputs.environment}
											className="select select-xs select-bordered"
										>
											{Object.keys(projectTier).map(key => (
												<option key={key} value={projectTier[key]}>
													{key}
												</option>
											))}
										</select>
									</div>
									<div className="flex-col space-y-0.5 alignItemsCenter">
										<label className="label-text font-bold">Region</label>
										<select
											name="region"
											onChange={handleInputChange}
											value={userInputs.region}
											className="select select-xs select-bordered"
										>
											{Object.keys(regions).map(key => (
												<option key={key} value={regions[key]}>
													{key}
												</option>
											))}
										</select>
									</div>
								</div>
								<button className="btn btn-sm btn-primary" onClick={handleUnitQuery}>Search</button>
							</div>
						</div>
					</div>
					<div className={`tabContent ${activeTab === tabs.Range ? "active" : ""}`}>
						<p>Range Query Coming Soon!</p>
					</div>
				</div>
			</div>
		</Draggable>
	);
}
