import React, { useState } from "react";

const buttons = [
  ["MC", "MR", "M+", "M-"],
  ["%", "CE", "C", "⌫"],
  ["1/x", "x²", "²√x", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["+/−", "0", ".", "="],
];

function operate(left, right, op) {
  left = parseFloat(left);
  right = parseFloat(right);
  switch (op) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right !== 0 ? left / right : "Error";
    default:
      return right;
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [operator, setOperator] = useState(null);
  const [storedValue, setStoredValue] = useState(null);
  const [resetNext, setResetNext] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleButton = (label) => {
    if ("0123456789".includes(label)) {
      if (display === "0" || resetNext) {
        setDisplay(label);
        setResetNext(false);
      } else {
        setDisplay(display + label);
      }
      setJustCalculated(false);
    } else if (label === ".") {
      if (!display.includes(".")) {
        setDisplay(display + ".");
      }
      setJustCalculated(false);
    } else if (["+", "−", "×", "÷"].includes(label)) {
      inputOperator(label);
    } else if (label === "=") {
      calculate();
      setOperator(null);
      setStoredValue(null);
      setJustCalculated(true);
    } else if (label === "C") {
      setDisplay("0");
      setOperator(null);
      setStoredValue(null);
      setJustCalculated(false);
      setResetNext(false);
    } else if (label === "CE") {
      setDisplay("0");
    } else if (label === "⌫") {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay("0");
      }
    } else if (label === "+/−") {
      setDisplay((parseFloat(display) * -1).toString());
    } else if (label === "%") {
      setDisplay((parseFloat(display) / 100).toString());
    } else if (label === "1/x") {
      const val = parseFloat(display);
      setDisplay(val !== 0 ? (1 / val).toString() : "Error");
    } else if (label === "x²") {
      setDisplay((parseFloat(display) ** 2).toString());
    } else if (label === "²√x") {
      const val = parseFloat(display);
      setDisplay(val >= 0 ? Math.sqrt(val).toString() : "Error");
    } else if (label === "MC") {
      setMemory(0);
    } else if (label === "MR") {
      setDisplay(memory.toString());
      setResetNext(true);
    } else if (label === "M+") {
      setMemory(memory + parseFloat(display));
    } else if (label === "M-") {
      setMemory(memory - parseFloat(display));
    }
  };

  const inputOperator = (op) => {
    const currVal = parseFloat(display);
    if (operator && !resetNext) {
      const result = operate(storedValue, currVal, operator);
      setStoredValue(result);
      setDisplay(result.toString());
    } else {
      setStoredValue(currVal);
    }
    setOperator(op);
    setResetNext(true);
    setJustCalculated(false);
  };

  const calculate = () => {
    if (operator !== null && storedValue !== null) {
      const currVal = parseFloat(display);
      const result = operate(storedValue, currVal, operator);
      setDisplay(result.toString());
      setStoredValue(result);
      setResetNext(true);
      setJustCalculated(true);
    }
  };

  return (
    <div
      style={{
        width: 320,
        background: "#22252A",
        color: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 4px 20px #0006",
        margin: "48px auto",
      }}
    >
      <input
        style={{
          width: "100%",
          fontSize: 32,
          height: 48,
          background: "#2A2D36",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          textAlign: "right",
          marginBottom: 16,
          paddingRight: 12,
        }}
        value={display}
        readOnly
      />
      <div>
        {buttons.map((row, rIdx) => (
          <div style={{ display: "flex", marginBottom: 6 }} key={rIdx}>
            {row.map((label) => (
              <button
                key={label}
                style={{
                  flex: 1,
                  marginRight: 6,
                  fontSize: 20,
                  background: ["CE", "C", "="].includes(label)
                    ? "#393e4d"
                    : "#2A2D36",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "14px 0",
                  cursor: "pointer",
                }}
                onClick={() => handleButton(label)}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
