/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import "./Question.css";
import { Link } from "react-router-dom";
import { questions } from "../api/dataQuestion";
import { user } from "../api/dataUser";

export function Question(props) {
  const { question, option, currQuestion, onSelect, selectedOption, totalCorrect, secondLeft } = props;

  const [total, setTotal] = useState(totalCorrect);
  const [onShow, setOnShow] = useState(false);

  function handleResult() {
    selectedOption === question[currQuestion - 1]?.correct_answer ? setTotal(total + 1) : setTotal(total);
    setOnShow(true);
  }

  function handleCleanup() {
    questions.splice(0, questions.length);
    user.name = "";
    setTotal(0);
  }

  return (
    <>
      <div className="question-body">
        {currQuestion < question.length && secondLeft !== 0 ? (
          <>
            <p>Player: {user.name ? user.name : "Unknown"}</p>
            <h3>{question[currQuestion].question}</h3>
            <div className="option-container">
              {option.map((value, index) => {
                return (
                  <div className="option-item" key={index}>
                    <button onClick={() => onSelect(value)}>{value}</button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="result">
            <button onClick={handleResult} className="btn-result" hidden={onShow}>
              Show Result
            </button>
            <Link className="link-result" to="/">
              <button hidden={!onShow} className="btn-result" onClick={handleCleanup}>
                Back to Home
              </button>
            </Link>
            <div hidden={!onShow} className="result-body">
              <p>Your result</p>
              <div className="result-child">
                <h2>Correct: {total + totalCorrect}</h2>
                <h2>Incorrect: {currQuestion - (total + totalCorrect)}</h2>
                <h2>Total answer: {currQuestion}</h2>
              </div>
              <h1>{Math.round(((total + totalCorrect) / question.length) * 100)}</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
