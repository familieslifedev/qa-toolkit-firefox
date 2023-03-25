import { useEffect, useState } from "react";

const FeedbackPanel = ({ feedbackText, feedbackProgress }) => {
  const [autoConsume, setAutoConsume] = useState(false);


   async function tempOverride() {
     let command ="showPlinth"
     await chrome.runtime.sendMessage({
       type: "BG_injectConsoleCommand",
       functionName: command,
     })
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (autoConsume) {
        event.stopPropagation();
        if (event.key === 'p') {
          tempOverride();
        }
      } else {
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [autoConsume]);


  function handleAutoConsume(e) {
    setAutoConsume(e.target.checked);
  }


  return (
    <div className="feedbackPanelContainer">
      <p> Auto Consume Inputs</p>
      <input type="checkbox" id="autoConsume" defaultChecked={autoConsume} onInput={handleAutoConsume}></input>
      <div className="feedbackTextContainer">
        <p>{feedbackText}</p>
      </div>
      <div className="feedbackProgressContainer">
      </div>
    </div>
  );
};

export default FeedbackPanel;