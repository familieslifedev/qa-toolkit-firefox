import React, { useState } from "react";
import Draggable from "react-draggable";
import { convertPenceToPounds, get2DJson, productFeederQuery } from "~Utils/Utils";
import { ProductInterface, projectTier, regions } from "~Utils/Constants";
import { getPrice } from "~Components/SwitchAndSave/SwitchAndSaveRules";

enum tabs {
  Product,
  Unit,
  Range,
}

interface UserInputs {
  productQueryInput: string;
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

  const [userInputs, setUserInputs] = useState<UserInputs>({
    productQueryInput: '',
    environment: projectTier.project0,
    region: regions.UK,
    campaignPhaseId: 255,
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
      [name]: value,
    });
  };

  const getPhaseId = async (): Promise<void> => {
    const Json = await get2DJson();
    if (Json) {
      console.log(Json);
      setUserInputs({
        ...userInputs,
        campaignPhaseId: Json.lock.campaignPhaseId,
      });
    }
  };

  async function handleProductQuery() {
    const searchResponse = await productFeederQuery(userInputs.environment, userInputs.region, userInputs.productQueryInput, userInputs.campaignPhaseId);
    if (searchResponse) {
      console.log('ProductQuery: ', searchResponse);
      setProductQueryResult(searchResponse.items[0]);
    } else {
      console.log('ProductQuery: No results');
    }
  }

  const handlePriceQuery = () => {
    if (productQueryResult && productQueryResult?.promoPrice?.gross && productQueryResult?.discountedOrderPrice?.gross) {
      return (
          <>
            <b>Price:</b> <s>{userInputs.region === regions.US ? '$' : '£'}{convertPenceToPounds(productQueryResult?.promoPrice.gross)}</s> £{convertPenceToPounds(getPrice(productQueryResult))}
          </>
      );
    } else if (productQueryResult) {
      return (
          <>
            <b>Price:</b> {userInputs.region === regions.US ? '$' : '£'}{convertPenceToPounds(getPrice(productQueryResult))}
          </>
      );
    } else {
      return null;
    }
  };

  const handleImageChange = (direction: 'next' | 'prev') => {
    const lastIndex = productQueryResult?.productImageUrls.length - 1;

    if (direction === 'next') {
      setCurrentImageIndex(currentImageIndex < lastIndex ? currentImageIndex + 1 : 0);
    } else {
      setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : lastIndex);
    }
  };

  const generatePimLink = (): string => {
    return `https://frontend.${userInputs.environment === projectTier.live ? '' : userInputs.environment + '.'}wrenkitchens.${userInputs.region}/pim/product/view/${productQueryResult?.productCode}#details_tab`;
  };



  function displayProductQueryResults(): JSX.Element {
    if (productQueryResult) {
      return (
          <div className="productQueryResults">
            <div className="ProductQueryHeader">
              <div className="productQueryImageContainer">
                <button className="productQueryImageCycleButton productQueryImageCycleButtonLeft" onClick={() => handleImageChange('prev')}>←</button>
                <div className="productQueryImageContainer">
                  <img   src={
                    (productQueryResult?.productImageUrls && productQueryResult.productImageUrls[currentImageIndex]?.image500Url)
                        ? productQueryResult.productImageUrls[currentImageIndex]?.image500Url
                        : ""}
                         alt="Product" />
                </div>
                <button className="productQueryImageCycleButton productQueryImageCycleButtonRight" onClick={() => handleImageChange('next')}>→</button>
              </div>
              <div className="flex-col">
                <p><b>Product Name:</b> {productQueryResult?.productName || "N/a"}</p>
                <p><b>Product SKU:</b> {productQueryResult?.productCode || "N/a"} <b>  Product ID:</b> {productQueryResult?.productId || "N/a"}</p>
                <p><b>Brand:</b> {productQueryResult?.manufacturer || "N/a"}</p>
                <p>{handlePriceQuery()}</p>
                <p><b>Colour: </b> {productQueryResult?.productColour?.name || "N/a"}</p>
                <p><b>Dimensions: </b> H{productQueryResult?.heightMm || "N/a"}mm W{productQueryResult?.widthMm || "N/a"}mm D{productQueryResult?.depthMm || "N/a"}mm </p>
                <p><b>Status: </b> {productQueryResult?.productStateHandle || "N/a"}</p>
                <p><b>Retail Store: </b> {productQueryResult?.retailStore?.name || "N/a"}</p>
                <p><b>Retail Category: </b> {productQueryResult?.retailCategory?.name || "N/a"}</p>
                <p><b>Retail Sub-Category: </b> {productQueryResult?.retailSubCategory?.name || "N/a"}</p>
                <p><b>Technical Specs: </b> {productQueryResult?.technicalSpecificationUrl ? (
                    <a className="link link-accent" target="_blank" href={productQueryResult.technicalSpecificationUrl}>
                      {productQueryResult.technicalSpecificationUrl}
                    </a>
                ) : (
                    "N/a"
                )}</p>
                <p><b>PIM Link: </b> <a className="link link-accent" target="_blank" href={generatePimLink()}>Click Here</a></p>
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
        <div className={`ProductQueryPanel ${hidden ? 'hidden' : ''}`}>

          <div id="ProductQueryHeaderBar" className="ProductQueryHeaderBar handle">
            <label className="jsonEditorHeaderLabel">Product Query</label>
          </div>

          <label className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</label>
          <div className="tabs modalTabs">
            <h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Product ? 'tab-active' : ''}`} onClick={() => handleTabClick(tabs.Product)}> Product Query </h1>
            <h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Unit ? 'tab-active' : ''}`} onClick={() => handleTabClick(tabs.Unit)}> Unit Query </h1>
            <h1 className={`tab tab-bordered modalTab ${activeTab === tabs.Range ? 'tab-active' : ''}`} onClick={() => handleTabClick(tabs.Range)}> Range Query </h1>
          </div>

          <div className="tabContentContainer">
            <div className={`tabContent ${activeTab === tabs.Product ? 'active' : ''}`}>
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
                        <button className="btn btn-xs" title="Get from current plan" onClick={getPhaseId}>From plan</button>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary" onClick={handleProductQuery}>Search</button>
                </div>
              </div>
              <div className={`tabContent ${activeTab === tabs.Unit ? 'active' : ''}`}>
              </div>
              <div className={`tabContent ${activeTab === tabs.Range ? 'active' : ''}`}>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
  );
}
