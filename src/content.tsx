import cssText from "data-text:~style.css"
import SidebarNav from "~sidebar/sidebarNav";
import {useStorage} from "@plasmohq/storage/dist/hook";
import SidebarMainContent from "~sidebar/sidebarMainContent";
import { useEffect, useState } from "react";
import FeedbackPanel from "~sidebar/feedbackPanel";
import {FeedbackContext} from "~Utils/sidebarContext";
import JsonEditorModal from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/JsonEditor/JsonEditorModal";
import * as contentMessageHandler from "~Utils/contentMessageHandler";
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const handler = contentMessageHandler[request.type];

    if (handler) {
      handler(request, sender, sendResponse);
    } else {
      console.error("Unknown message type:", request.type);
      sendResponse({ error: 'Unknown message type' });
    }
  } catch (error) {
    console.error("Error processing message:", error);
    sendResponse({ error: 'Error processing message' });
  }
    // Asynchronous response, keep the channel open
    return true;
});
const Sidebar = () => {
  const [isHidden, setIsHidden] = useState( true);
  const [theme, setTheme] = useStorage("theme", "emerald");
  const [triggerKeyDown, setTriggerKeyDown] = useState(false);
  const [triggerKey] = useStorage("triggerKey", "Q");
  const [modifierKey] = useStorage("modifierKey", "Control");
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackProgress, setFeedbackProgress] = useState(0);


  const handleHideClick = () => {
    setIsHidden(!isHidden);
  };

  const handleKeyDown = (event) => {
    if (event.getModifierState(modifierKey) && event.key.toUpperCase() === triggerKey) {
      if (!triggerKeyDown) {
        setTriggerKeyDown(true);
        handleHideClick();
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key.toUpperCase() === triggerKey){
      setTriggerKeyDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const contextValue = {
    setFeedbackText
  };

  return (
    <FeedbackContext.Provider  value={{ feedbackText, setFeedbackText }}>
      <div data-theme={theme} className="sidebarMainContainer">
        <button className="btn btn-toolkit-hide btn-sm btn-primary" onClick={handleHideClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
        </button>
        <div className={`sidebarInnerContainer ${isHidden ? "hidden" : ""}`}>
          <SidebarNav/>
          <SidebarMainContent/>
          <FeedbackPanel feedbackText={feedbackText} feedbackProgress={feedbackProgress}/>
        </div>
      </div>
    </FeedbackContext.Provider>
  )
}

export default Sidebar
