import React, { useState } from "react";
import * as math from "mathjs";

export default function Calc() {
  const [lastResult, setLastResult] = useState("");
  const [calcOutput, setCalcOutput] = useState("");
  const [runningCalc, setRunningCalc] = useState("");

  const handleNumberClick = (event) => {
    const number = event.currentTarget.dataset.key;
    if (runningCalc.includes("=")) {
      setRunningCalc("");
    }
    setCalcOutput(calcOutput + number);
  };
  const handleOperatorClick = (event) => {
    const operator = event.currentTarget.dataset.key;
    let updatedRunningCalc = runningCalc;
    if (runningCalc.includes("=")) {
      setRunningCalc(lastResult + operator);
      setCalcOutput("");
      return
    }
    const lastChar = runningCalc.slice(-1);
    if (["+","-","*","/"].includes(lastChar)) {
      if(!calcOutput) {
        updatedRunningCalc = runningCalc.slice(0, -1) + operator;
      }else{
        updatedRunningCalc += calcOutput + operator;
      }
    } else {
      updatedRunningCalc += calcOutput + operator;
    }
    setRunningCalc(updatedRunningCalc);
    setCalcOutput("");
  };
  const handleEqualClick = () => {
    try {
      const result = math.evaluate(runningCalc + calcOutput);
      setRunningCalc(runningCalc + calcOutput + " = ");
      setLastResult(result.toString());
      setCalcOutput(result.toString());
    } catch (error) {
      setRunningCalc("Error");
      setCalcOutput("");
    }
  };

  const handleClearClick = () => {
    setRunningCalc("");
    setCalcOutput("");
    setLastResult("");
  };

  function handleNegativeClick() {
    if (calcOutput.includes("-")) {
      setCalcOutput(runningCalc.replace("-", ""));
    } else {
      setCalcOutput("-" + calcOutput);
    }
  }

  function handleBackspace() {
    if (calcOutput.length > 0) {
      if (runningCalc.includes("=")) {
        setRunningCalc("");
      }
      setCalcOutput(calcOutput.slice(0, -1));
    }
  }

  return (
    <div className="calcOuter">
      <div className="calcInner">
        <div className="calcDisplay">
          <div className="calcContent">
            <div className="calcInput">{runningCalc}</div>
            <div className="calcOutput">{calcOutput}</div>
          </div>
        </div>
        <div className="calcButtons">
          <div data-key="clear" className="calcButton calcAction" onClick={handleClearClick}>
            <span>AC</span>
          </div>
          <div data-key="Negative" className="calcButton calcAction" onClick={handleNegativeClick}>
            <span>+/-</span>
          </div>
          <div data-key="%" className="calcButton calcAction" onClick={handleOperatorClick}>
            <span>%</span>
          </div>
          <div data-key="/" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>÷</span>
          </div>
          <div data-key="7" className="calcButton" onClick={handleNumberClick}>
            <span>7</span>
          </div>
          <div data-key="8" className="calcButton" onClick={handleNumberClick}>
            <span>8</span>
          </div>
          <div data-key="9" className="calcButton" onClick={handleNumberClick}>
            <span>9</span>
          </div>
          <div data-key="*" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>×</span>
          </div>
          <div data-key="4" className="calcButton" onClick={handleNumberClick}>
            <span>4</span>
          </div>
          <div data-key="5" className="calcButton" onClick={handleNumberClick}>
            <span>5</span>
          </div>
          <div data-key="6" className="calcButton" onClick={handleNumberClick}>
            <span>6</span>
          </div>
          <div data-key="-" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>-</span>
          </div>
          <div data-key="1" className="calcButton" onClick={handleNumberClick}>
            <span>1</span>
          </div>
          <div data-key="2" className="calcButton" onClick={handleNumberClick}>
            <span>2</span>
          </div>
          <div data-key="3" className="calcButton" onClick={handleNumberClick}>
            <span>3</span>
          </div>
          <div data-key="+" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>+</span>
          </div>
          <div data-key="backspace" className="calcButton calcAction" onClick={handleBackspace}>
            <span>⌫</span>
          </div>
          <div data-key="0" className="calcButton" onClick={handleNumberClick}>
            <span>0</span>
          </div>
          <div data-key="." className="calcButton" onClick={handleNumberClick}>
            <span>.</span>
          </div>
          <div data-key="=" className="calcButton calcOperator" onClick={handleEqualClick} >
            <span>=</span>
          </div>
        </div>
      </div>
    </div>
  )
}