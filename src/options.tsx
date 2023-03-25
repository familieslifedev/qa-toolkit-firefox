import { useState } from "react"
import "./style.css"
import { useStorage } from "@plasmohq/storage/dist/hook";
import { themes } from "~options/themes";
function OptionsIndex() {
  const [theme, setTheme] = useStorage("theme", "emerald");
  const [triggerKey, setTriggerKey] = useStorage("triggerKey", "Q");
  const [modifierKey, setModifierKey] = useStorage("modifierKey");


  function saveTheme(event) {
    setTheme(event.target.value).then(r => console.log("theme Updated"));
  }
  function saveModKey(event) {
    setModifierKey(event.target.value).then(r => console.log("Mod Key Assigned" + event.target.value));
    console.log("Set Modifier key to " + event.target.key)
  }
  function saveTriggerKey(event) {
    console.log("Set trigger key to " + event.target.value)
    setTriggerKey(event.target.value);
  }

  return (
    <div data-theme={theme} className="optionsPanel">
      <h1 className="optionsTitle">
        Options
      </h1>

      <div className="divider"></div>
      <h2 className="optionsHeading"> Theme Settings </h2>

      <div className="divider"></div>
      <label className="label label-text-alt">Theme select</label>
      <select onChange={saveTheme} value={theme} className="select select-primary w-full max-w-xs" title={"Set Theme"}>
        <option disabled>Select a Theme</option>
        {themes.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>

      <div className="divider"></div>
      <h2 className="optionsHeading">Control Settings</h2>
      <div className="divider"></div>
      <h1 className="text-lg ">Keybind to toggle sidebar</h1>
      <label className="label label-text-alt ">Modifier + Key to toggle sidebar</label>
      <div className="flex flex-wrap" >
        <select onChange={saveModKey} value={modifierKey} className="select select-primary w-36 m-1" title={"Modifier Key"}>
          <option value="Control">Control</option>
          <option value="Shift">Shift</option>
          <option value="Alt">Alt / Option</option>
        </select>
        <input
          className="input input-primary w-20 m-1"
          defaultValue={triggerKey}
          maxLength={1}
          onClick={(event) => (event.target as HTMLInputElement).select()}
          onChange={(event) => {
            event.target.value = event.target.value.toUpperCase();
            saveTriggerKey(event);
          }}>
        </input>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default OptionsIndex