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

  const [error, setError] = useState(null);

  const [naira, setNaira] = useState(300);
  const [eAmount , setEAmount] = useState('')

  const depositNaira = (event) => {
        event.preventDefault()
        if(+eAmount <  +result){
            setNaira(prev => prev + +eAmount * 300)
            localStorage.setItem("result" , +localStorage.getItem("result") - +eAmount  )  
            setTrigger((prev) => prev + 1);
            setError(null)
        }else{
            setError('insufficient balance')
        }
  };

  const deposit = (event) => {
    event.preventDefault();
    if (+amount < +naira) {
      localStorage.setItem(
        "result",
        +amount / 300 + +localStorage.getItem("result").substring(0, 6)
      );
      setTrigger((prev) => prev + 1);
      setAmount("");
      setNaira(prev => prev - +amount)
      setError(null)
    } else {
      setError("insufficient balance");
    }
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
        ? +amount / 300 + +localStorage.getItem("result")?.substring(0, 6)
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
                <span>Dashboard</span> <br /> Naira Balance: {naira}
              </h1>

              <div>
                <label style={{ display: "block", fontSize: "20px" }}>
                  Change Naira to E-naira
                </label>
                <input
                  type="number"
                  placeholder=""
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button onClick={deposit}>Submit</button>
            </form>
            {error &&  <p>{error} </p>}
            <form action="">
              <h1>
                <span></span> <br /> E-Naira Balance: {result}
              </h1>

              <div>
                <label style={{ display: "block", fontSize: "20px" }}>
                    Change E-naria to Naira
                </label>
                <input
                  type="number"
                  placeholder="Enter your amount in naira"
                  value={eAmount}
                  onChange={(e) => setEAmount(e.target.value)}
                />
              </div>
              <button onClick={depositNaira}>Submit</button>
            </form>
            {/* <form>
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
                  type="number"
                  placeholder="Enter your email"
                  value={calResult}
                  readOnly="readonly"
                />
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
