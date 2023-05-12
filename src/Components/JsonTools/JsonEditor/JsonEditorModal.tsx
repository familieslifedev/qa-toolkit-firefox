import { useState } from "react";
import JsonViewer from "~Components/JsonTools/JsonEditor/JsonViewer";
import JsonReplacer from "~Components/JsonTools/JsonEditor/JsonReplacer";
import Draggable from "react-draggable";

enum tabs {
  Editor,
  Replace
}

interface Props {
  hidden: boolean;
  onHiddenChange: (hidden: boolean) => void;
}

export default function JsonEditorModal({ hidden, onHiddenChange }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<tabs>(tabs.Editor);

  const handleHidePanel = () => {
    onHiddenChange(true);
  }

  const handleTabClick = (tabName: tabs) => {
    setActiveTab(tabName);
  }

  return (
    <Draggable handle="#jsonEditorHeaderBar">
      <div className={`jsonEditorPanel ${hidden ? 'hidden' : ''}`}>

        <div id="jsonEditorHeaderBar" className="jsonEditorHeaderBar handle">
          <label className="jsonEditorHeaderLabel">Json Edit</label>
        </div>

        <label className="btn btn-xs btn-circle absolute right-1.5 top-1.5" onClick={handleHidePanel}>✕</label>
        <div className="tabs jsonEditTabs">
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === tabs.Editor ? 'tab-active' : ''}`} onClick={() => handleTabClick(tabs.Editor)}> Editor </h1>
          <h1 className={`tab tab-bordered jsonEditTab ${activeTab === tabs.Replace ? 'tab-active' : ''}`} onClick={() => handleTabClick(tabs.Replace)}> Replace </h1>

        </div>

        <div className="jsonContentContainer">
          <div className={`tabContent ${activeTab === tabs.Editor ? 'active' : ''}`}>
            <JsonViewer edit={true} />
          </div>
          <div className={`tabContent ${activeTab === tabs.Replace ? 'active' : ''}`}>
            <JsonReplacer />
          </div>
        </div>
      </div>
    </Draggable>
  );
}
