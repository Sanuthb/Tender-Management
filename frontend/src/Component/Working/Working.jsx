import React from "react";
import "./Working.css"

const Working = () => {
  return (
    <div className="working">
      <div className="heading">
        <h1>How it works?</h1>
        <p>Follow these simple steps and make profits !</p>
      </div>
      <div className="conatiner">
        <div className="card">
          <div className="outerring">
            <div className="innerring">
              <img src="/w2.png" alt="register"  />
            </div>
          </div>
          <h1>Register for free</h1>
        </div>
        <img src="/arrow.png" alt="arrow" />
        <div className="card">
          <div className="outerring">
            <div className="innerring">
              <img src="/w1.png" alt="Bid" />
            </div>
          </div>
          <h1>Buy or Bid</h1>
        </div>
        <img src="/arrow.png" alt="arrow" className="animation"/>
        <div className="card">
          <div className="outerring">
            <div className="innerring">
              <img src="/w3.png" alt="Submit"  />
            </div>
          </div>
          <h1>Submit a Bid</h1>
        </div>
        <img src="/arrow.png" alt="arrow" />
        <div className="card">
          <div className="outerring">
            <div className="innerring">
              <img src="/w4.png" alt="win" />
            </div>
          </div>
          <h1>Win Tender</h1>
          
        </div>
      </div>
    </div>
  );
};

export default Working;
