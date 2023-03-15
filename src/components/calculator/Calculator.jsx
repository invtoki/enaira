import React, { useEffect, useRef } from "react";
import { useState } from "react";
const Calculator = () => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(
    localStorage.getItem("result")?.substring(0, 6)
  );
  const [trigger, setTrigger] = useState(0);
  const [calAmount, setCalcAmount] = useState("");
  const [calResult, setCalResult] = useState("");
  const deposit = (event) => {
    event.preventDefault();
    localStorage.setItem(
      "result",
      +amount / 300 + +localStorage.getItem("result").substring(0, 6)
    );
    setTrigger((prev) => prev + 1);
    setAmount("");
  };

  const calculate = useRef(() => {});

  calculate.current = () => {
    setCalResult(+calAmount / 300);
  };

  useEffect(() => {
    calculate.current();
  }, [calAmount]);

  useEffect(() => {
    localStorage.setItem(
      "result",
      +amount !== 0
        ? +amount / 300 + +localStorage.getItem("result").substring(0, 6)
        : localStorage.getItem("result")?.substring(0, 6)
    );
    setResult(localStorage.getItem("result"));
  }, [trigger]);

  return (
    <div>
      <div
        className="contact"
        style={{ height: "auto", paddingBottom: "200px" }}
      >
        <div className="container">
          <div
            className="form-container"
            style={{
              display: "flex",
              flexDirection: "column",
              transform: "translateY(100px)",
            }}
          >
            <form action="">
              <h1>
                <span>Dashboard</span> <br /> Avaialable Balance: {result}
              </h1>

              <div>
                <label style={{ display: "block", fontSize: "20px" }}>
                  Deposit
                </label>
                <input
                  type="number"
                  placeholder="Enter your amount in naira"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button onClick={deposit}>Submit</button>
            </form>
            <form>
              <h1>
                <span>Calculator</span>
              </h1>
              <div>
                <label style={{ display: "block", fontSize: "20px" }}>
                  You deposit
                </label>
                <input
                  type="number"
                  placeholder="Enter your name"
                  value={calAmount}
                  onChange={(e) => setCalcAmount(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "20px" }}>
                  You get
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={calResult}
                  readOnly="readonly"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
