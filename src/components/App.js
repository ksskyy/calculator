// import { useState } from "react";
import Header from "./Header";
import React, { useState } from "react";
import { calculatorButtons } from "../globals/calculator-button-data";

const appInfo = {
  title: "React Calculator",
};
const Calculator = () => {
  const [input, setInput] = useState("0");
  const [memory, setMemory] = useState(null);

  const handleButtonClick = (value) => {
    switch (value) {
      case "All Clear":
        setInput("0");
        break;
      case "Clear":
        setInput((prevInput) =>
          prevInput.length === 1 ? "0" : prevInput.slice(0, -1)
        );
        break;
      case "Memory Save":
        setMemory(parseFloat(input));
        setInput("");
        break;
      case "Memory Clear":
        handleMemoryClear();
        break;
      case "Memory Recall":
        setInput((prevInput) => prevInput + memory);
        break;
      case "Memory Subtract":
        setMemory(memory - parseFloat(input));
        setInput("");
        break;
      case "Memory Addition":
        setMemory(memory + parseFloat(input));
        setInput("");
        break;
      case "Percent":
        handlePercentage();
        break;
      case "Square Root":
        handleSquareRoot();
        break;
      case "Multiply":
        setInput((prevInput) => prevInput + "*");
        break;
      case "Divide":
        setInput((prevInput) => prevInput + "/");
        break;
      case "Add":
        setInput((prevInput) => prevInput + "+");
        break;
      case "Subtract":
        setInput((prevInput) => prevInput + "-");
        break;
      case "+/-":
        handleSign();
        break;

      case "Equal":
        handleCalculate();
        break;

      default:
        setInput((prevInput) =>
          prevInput === "0" ? value.toString() : prevInput + value.toString()
        );
        break;
    }
  };

  const handleMemoryClear = () => {
    if (memory !== null) {
      setMemory(null);
    }
  };
  const handlePercentage = () => {
    try {
      const result = (parseFloat(input) / 100).toString();
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };
  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(input)).toString();
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };
  const handleSign = () => {
    try {
      setInput((prevInput) => {
        if (prevInput === "0") {
          return prevInput;
        } else {
          if (prevInput[0] === "-") {
            return prevInput.slice(1);
          } else {
            return "-" + prevInput;
          }
        }
      });
    } catch (error) {
      setInput("Error");
    }
  };
  const handleCalculate = () => {
    try {
      const result = new Function(`return ${input}`)();
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const renderButtons = () => {
    return calculatorButtons.map((button, index) => {
      let buttonStyle = "";
      switch (button.type) {
        case "clear":
          buttonStyle = "clear-btn";
          break;
        case "memory":
          buttonStyle = "memory-btn";
          break;
        case "number":
          buttonStyle = "number-btn";
          break;
        case "decimal":
          buttonStyle = "decimal-btn";
          break;
        case "sign":
          buttonStyle = "sign-btn";
          break;
        case "operator":
          buttonStyle = "operator-btn";
          break;
        case "enter":
          buttonStyle = "enter-btn";
          break;
        default:
          break;
      }

      return (
        <div className={`${button.className}`} key={index}>
          <button
            key={index}
            className={`calculator-btn ${buttonStyle}`}
            onClick={() => handleButtonClick(button.value)}
          >
            {button.text}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="wrapper">
      <Header title={appInfo.title} />
      <div className="calculator">
        <input className="result" type="text" value={input} readOnly />
        {renderButtons()}
      </div>
    </div>
  );
};

export default Calculator;
