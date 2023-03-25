import React, { useState } from "react";

export default function ConversionTools() {
  const [inches, setInches] = useState(0);
  const [numerator, setNumerator] = useState(0);
  const [denominator, setDenominator] = useState(1);
  const [cm, setCm] = useState(0);

  const handleInchesChange = (event) => {
    const input = event.target.value;
    if (input === "") {
      setInches(0);
      setNumerator(0);
      setDenominator(1);
    } else if (input.includes(" ")) {
      const [integerPart, fractionPart] = input.split(" ");
      if (fractionPart.includes("/")) {
        const [numeratorPart, denominatorPart] = fractionPart.split("/");
        setInches(parseInt(integerPart));
        setNumerator(parseInt(numeratorPart));
        setDenominator(parseInt(denominatorPart));
      } else {
        setInches(parseFloat(input));
        setNumerator(0);
        setDenominator(1);
      }
    } else {
      setInches(parseFloat(input));
      setNumerator(0);
      setDenominator(1);
    }
  };

  const handleNumeratorChange = (event) => {
    const input = event.target.value;
    if (input === "") {
      setNumerator(0);
    } else {
      setNumerator(parseInt(input));
    }
  };

  const handleDenominatorChange = (event) => {
    const input = event.target.value;
    if (input === "") {
      setDenominator(1);
    } else {
      setDenominator(parseInt(input));
    }
  };

  const handleCmToInches = () => {
    const totalInches = cm / 2.54;
    const inchesValue = Math.floor(totalInches);
    const fractionValue = Math.round((totalInches % 1) * denominator);
    setInches(inchesValue);
    setNumerator(fractionValue);
    setDenominator(denominator);
  };

  const handleInchesToCm = () => {
    const totalInches = inches + numerator / denominator;
    const cmValue = totalInches * 2.54;
    setCm(cmValue);
  };

  return (
    <div className="conversionContainer m-2">
      <div className="inputContainer">
        <label htmlFor="inchesInput">Inches:</label>
        <div className="input-group">
          <input
            id="inchesInput"
            type="number"
            className="input input-primary input-sm input-num"
            value={inches}
            onChange={handleInchesChange}
          />
          <span className="input-group-addon">"</span>
          <input
            type="number"
            className="input input-num input-primary input-sm input-fraction"
            value={numerator}
            onChange={handleNumeratorChange}
          />
          <span className="input-group-addon">/</span>
          <input
            type="number"
            className="input input-num input-primary input-sm input-fraction"
            value={denominator}
            onChange={handleDenominatorChange}
          />
        </div>
      </div>
      <div className="buttonContainer">
        <button className="button button-primary" onClick={handleInchesToCm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6 6l6 6 6-6H6z" />
          </svg>
        </button>
      </div>
      <div className="inputContainer">
        <label htmlFor="cmInput">Centimeters:</label>
        <input
          id="cmInput"
          type="number"
          className="input input-primary input-sm input-num"
          value={cm}
          onChange={(event) => setCm(parseFloat(event.target.value))}
        />
      </div>
    </div>
  );
}
