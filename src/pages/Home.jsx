/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { user } from "../api/data";
import "./Home.css";
import { useState, useEffect } from "react";
import { QuizDetails } from "../components/QuizDetails";
import { getQuizList } from "../api/quiz";
import { questions } from "../api/dataQuestion";

export function Home() {
  const [isHidden, setIsHidden] = useState(true);
  const [dataQuestion, setDataQuestion] = useState([]);

  function handleDetails() {
    setIsHidden(!isHidden);
  }

  useEffect(() => {
    getQuizList().then((result) => {
      setDataQuestion(result);
    });
  }, []);

  function handleClick() {
    questions.push(...dataQuestion);
  }

  return (
    <>
      <div className="container-home">
        <h1>Quiz App</h1>
        <Link className="link button-home" to="/play" onClick={handleClick}>
          Play
        </Link>
        <br></br>
        <span onClick={handleDetails}>Show Detail Question...</span>
        <QuizDetails hidden={isHidden} />
      </div>
    </>
  );
}
