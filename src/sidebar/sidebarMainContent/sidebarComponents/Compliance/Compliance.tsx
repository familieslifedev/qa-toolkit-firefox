import React from "react";
export default function ComplianceTools() {

  async function handleCorniceLoad() {
    let command ="showCornice"
    await chrome.runtime.sendMessage({
      type: "BG_injectConsoleCommand",
      functionName: command,
    })
  }
  async function handlePelmetLoad() {
    let command ="showPelmet"
    await chrome.runtime.sendMessage({
      type: "BG_injectConsoleCommand",
      functionName: command,
    })
  }
  async function handlePlinthLoad() {
    let command ="showPlinth"
    await chrome.runtime.sendMessage({
      type: "BG_injectConsoleCommand",
      functionName: command,
    })
  }


  function handleAcceptAnnotation() {
    document.querySelectorAll('.tabs-menu-item > a').forEach((t) => {
      // @ts-ignore
      t.click(), document.querySelectorAll(".check-notes-table input[type=\"checkbox\"]").forEach(({ checked, click }) => !checked ? click() : null);
    });
  }

  return (
    <div className="complianceContainer">
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleAcceptAnnotation}>Accept All Annotations</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handleCorniceLoad}>Show Cornice</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handlePelmetLoad}>Show Pelmet</button>
      <button className="btn btn-sm btn-wide btn-primary" onClick={handlePlinthLoad}>Show Plinth</button>

    </div>
  );
}