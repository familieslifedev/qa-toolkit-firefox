import { useEffect, useState } from "react";
import { Request as BackgroundRequest, RequestType } from "../../Services/Background/Request";
import browser from "webextension-polyfill";

const FeedbackPanel = ({ feedbackText, feedbackProgress }): JSX.Element => {
  const [autoConsume, setAutoConsume] = useState<boolean>(false);

   async function tempOverride(): Promise<void> {
    const request: BackgroundRequest = {
      type: RequestType.InjectConsoleCommand,
      functionName: "showPlinth",
      arguments: null
    };

    const _ = await browser.runtime.sendMessage(request);
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
    {/*  <p> Auto Consume Inputs</p>
      <input type="checkbox" id="autoConsume" defaultChecked={autoConsume} onInput={handleAutoConsume}></input>*/}
      <div className="feedbackTextContainer">
        <p>{feedbackText}</p>
      </div>
      <div className="feedbackProgressContainer">
      </div>
    </div>
  );
};

export default FeedbackPanel;