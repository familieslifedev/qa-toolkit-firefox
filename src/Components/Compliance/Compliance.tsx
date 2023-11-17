import React from "react";
import { Request as BackgroundRequest, RequestType } from "../../Services/Background/Request";
import browser from "webextension-polyfill";

export default function ComplianceTools() {

  async function handleCorniceLoad(): Promise<void> {
    const request: BackgroundRequest = {
      functionName: "showCornice",
      type: RequestType.InjectConsoleCommand,
      arguments: null
    };

    await browser.runtime.sendMessage(request);
  }

  async function handlePelmetLoad(): Promise<void> {
    const request: BackgroundRequest = {
      functionName: "showPelmet",
      type: RequestType.InjectConsoleCommand,
      arguments: null
    };

    await browser.runtime.sendMessage(request);
  }

  async function handlePlinthLoad() {
    const request: BackgroundRequest = {
      functionName: "showPlinth",
      type: RequestType.InjectConsoleCommand,
      arguments: null
    };

    await browser.runtime.sendMessage(request);
  }

  function handleAnnotationBtnClicked(accept: boolean) {
    const annotationPopup = document.querySelector('.check-notes-popup-wrapper')
    if (annotationPopup) {
      // annotation popup already open just accept and save
      changeAnnotations(accept);
      return;
    }
    const annotationTab = document.querySelector('#file-menu-notes');
    if (annotationTab) {
      if (annotationTab.classList.contains('toggled')) {
        // we are on the annotations tab so can progress to open the popup
        openAnnotationPopup(accept);
      } else {
        // Not on the annotation tab so lets get there.
        (annotationTab as HTMLElement)?.click();
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              const checkNotes = document.querySelector('.check-notes');
              if (checkNotes) {
                // we are now on the annotations tab lets open the popup and proceed
                openAnnotationPopup(accept);
                observer.disconnect();
                break;
              }
            }
          }
        });
        observer.observe(document, {
          childList: true,
          subtree: true,
        });
      }
    }

    function openAnnotationPopup(accept: boolean) {
      const annotationPopupBtn = document.querySelector('.check-notes');
      if (annotationPopupBtn) {
        (annotationPopupBtn as HTMLElement)?.click();
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              const checkPopup = document.querySelector('.check-notes-popup-wrapper');
              if (checkPopup) {
                // we are now on the annotations tab lets open the popup and proceed
                changeAnnotations(accept);
                observer.disconnect();
                break;
              }
            }
          }
        });
        observer.observe(document, {
          childList: true,
          subtree: true,
        });
      }
    }

    function changeAnnotations(accept: boolean) {
      const tabMenuItems = document.querySelectorAll('.tabs-menu-item > a');
      tabMenuItems.forEach((t) => {
        if (t) {
          (t as HTMLElement)?.click();
        }
        const checkboxes = document.querySelectorAll('.check-notes-table input[type="checkbox"]');
        checkboxes.forEach((i) => {
          const inputElement = i as HTMLInputElement;
          if (accept) {
            if (!inputElement?.checked) {
              (i as HTMLElement)?.click();
            }
          } else {
            if (inputElement?.checked) {
              (i as HTMLElement)?.click();
            }
          }

        });
      });

      const saveButton = document.querySelector('.save')
      if (saveButton) {
        (saveButton as HTMLElement)?.click();
      }
    }
  }


  return (
      <div className="complianceContainer">
        <div className={"btn-group btn-group-horizontal"}>
          <button className="btn btn-sm btn-primary" onClick={() => handleAnnotationBtnClicked(true)}>☑ Annotations
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => handleAnnotationBtnClicked(false)}>☐ Annotations
          </button>
        </div>

        <button className="btn btn-sm btn-wide btn-primary" onClick={handleCorniceLoad}>Show Cornice</button>
        <button className="btn btn-sm btn-wide btn-primary" onClick={handlePelmetLoad}>Show Pelmet</button>
        <button className="btn btn-sm btn-wide btn-primary" onClick={handlePlinthLoad}>Show Plinth</button>

      </div>
  );
}