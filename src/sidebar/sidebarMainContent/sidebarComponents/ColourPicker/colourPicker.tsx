import { useState } from "react";
import { SliderPicker } from "@hello-pangea/color-picker";
import { writeToClipboard } from "~Utils/Utils";
export default function ColourPicker() {
  const [updateColor, setUpdateColor] = useState("#b32aa9");

  const colorPickerChange = (color) => {
    setUpdateColor(color.hex);
    writeToClipboard(updateColor);
  };

  function handleRandomColour() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    setUpdateColor("#" + randomColor);
    writeToClipboard("#" + randomColor);
  }

  return(
    <div className="pickerContainer">
      <SliderPicker onChangeComplete={colorPickerChange} color={updateColor} />
      <button className="btn btn-xs btn-primary mt-4" onClick={handleRandomColour}>Random Colour</button>
    </div>
  )
}
