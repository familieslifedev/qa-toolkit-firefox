import React, { useState } from "react";
import Draggable from "react-draggable";
import { productFeederQuery } from "~Utils/Utils";
import { projectTier, regions } from "~Utils/Constants";

enum tabs {
  Product,
  Unit,
  Range,
}

interface Props {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
}

export default function ProductQuery({ hidden, onHiddenChange }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<tabs>(tabs.Product);
  const [productQueryInput, setProductQueryInput] = useState<string>('');

  const handleHidePanel = () => {
    onHiddenChange(true);
  }

  const handleTabClick = (tabName: tabs) => {
    setActiveTab(tabName);
  }

  function handleProductInputChange(event: React.ChangeEvent<HTMLInputElement>):void {
    setProductQueryInput(event.target.value);
  }

  async function handleProductQuery() {
    console.log('ProductQuery: ', productQueryInput);
    const searchResponse = await productFeederQuery(projectTier.project2, regions.UK, productQueryInput, 251);
    if (searchResponse) {
      console.log('ProductQuery: ', searchResponse);
    } else {
      console.log('ProductQuery: No results');
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
                </div>
                <div className="productQueryContentRight">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Product Search:</span>
                    </label>
                    <input type="text" className="input input-primary input-sm w-full" placeholder="input Product SKU or ID" value={productQueryInput} onChange={handleProductInputChange}></input>
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
