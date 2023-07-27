/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { questions } from "../api/dataQuestion";
import { Loader } from "../components/Loading";
import { Timer } from "../utils/Timer";
import { Question } from "../components/Question";
import { shuffle } from "../utils/shuffle";
import "./Play.css";

export function Play() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [option, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const { secondLeft, start } = Timer();
  const bar = (secondLeft / 200) * 100;

  useEffect(() => {
    if (currQuestion === 0) {
      const timer = setTimeout(() => {
        startUp();
        start(200);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      if (currQuestion < questions.length) {
        setSelectedOption(null);
        startUp();
        selectedOption === questions[currQuestion - 1]?.correct_answer ? setTotalCorrect(totalCorrect + 1) : setTotalCorrect(totalCorrect);
      }
    }
  }, [currQuestion]);

  function startUp() {
    setOption(shuffle([questions[currQuestion]?.correct_answer, ...questions[currQuestion].incorrect_answers]));
  }

  function handleSelect(value) {
    const delay = setTimeout(() => {
      setCurrQuestion(currQuestion + 1);
    }, 1000);
    setSelectedOption(value);
    return () => clearTimeout(delay);
  }

  return (
    <>
      <div className="container-play">
        {questions.length !== 0 ? (
          <div className="wrapper">
            <nav>
              <div className="sign">
                <p hidden={currQuestion >= questions.length || secondLeft === 0}>
                  {currQuestion + 1}/{questions.length}
                </p>
              </div>
              <div>
                <h2>{currQuestion < questions.length ? questions[currQuestion].category : "Results"}</h2>
              </div>
              <div className="time">
                <p hidden={currQuestion >= questions.length || secondLeft === 0}>{secondLeft}</p>
              </div>
            </nav>
            <div className="timer-bar" style={{ width: `${bar}%` }} hidden={currQuestion >= questions.length || secondLeft === 0}></div>
            <Question
              question={questions}
              option={option}
              currQuestion={currQuestion}
              onSelect={(value) => {
                handleSelect(value);
              }}
              selectedOption={selectedOption}
              totalCorrect={totalCorrect}
              secondLeft={secondLeft}
              correct={questions[currQuestion]?.correct_answer}
            />
          </div>
        ) : (
          <>
            <h1 className="name">
              Hello
              <br /> Are you ready?
            </h1>
            <Loader />
          </>
        )}
      </div>
    </>
  );
}
