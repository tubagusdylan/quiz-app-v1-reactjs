/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { questions } from "../api/dataQuestion";
import { Loading } from "../components/Loading";
import { Timer } from "../utils/Timer";
import { Question } from "../components/Question";
import "./Play.css";

export function Play() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [option, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const { secondLeft, start } = Timer();

  useEffect(() => {
    if (currQuestion < questions.length) {
      setOption([questions[currQuestion].correct_answer, ...questions[currQuestion].incorrect_answers]);
      start(15);
      if (currQuestion !== 0) {
        selectedOption === questions[currQuestion - 1].correct_answer ? setTotalCorrect(totalCorrect + 1) : setTotalCorrect(totalCorrect);
      }
    }
  }, [currQuestion]);

  function handleSelect(value) {
    setSelectedOption(value);
    setCurrQuestion(currQuestion + 1);
  }

  return (
    <>
      <div className="container-play">
        <nav>
          <div className="sign">
            {currQuestion >= 10 ? (
              <p>10/{questions.length}</p>
            ) : (
              <p>
                {currQuestion + 1}/{questions.length}
              </p>
            )}
          </div>
          <div>
            <h2>Quiz</h2>
          </div>
          <div className="time">
            <p>{secondLeft}</p>
          </div>
        </nav>
        {questions.length !== 0 ? (
          <Question
            question={questions}
            option={option}
            currQuestion={currQuestion}
            onSelect={(value) => {
              handleSelect(value);
            }}
            selectedOption={selectedOption}
            totalCorrect={totalCorrect}
          />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
