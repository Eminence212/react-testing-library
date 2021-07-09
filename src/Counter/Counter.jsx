import React, { useState } from "react";
import "./Counter.css";
function Counter() {
  const [conterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  const addToCounter = () => {
    setCounterValue(conterValue + inputValue);
  };
  const subtractFromCounter = () => {
    setCounterValue(conterValue - inputValue);
  };
  return (
    <div>
      <h1 data-testid="header">My counter</h1>
      <h2
        data-testid="counter"
        className={`${conterValue >= 100 ? "green" : ""}${
          conterValue <= -100 ? "red" : ""
        }`}
      >
        {conterValue}
      </h2>
      <button data-testid="subtract-btn" onClick={subtractFromCounter}>
        -
      </button>
      <input
        data-testid="input"
        type="number"
        value={inputValue}
        className="text-center"
        onChange={(e) => {
          setInputValue(parseInt(e.target.value));
        }}
      />
      <button data-testid="add-btn" onClick={addToCounter}>
        +
      </button>
    </div>
  );
}

export default Counter;
