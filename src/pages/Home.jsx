/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import { questions } from "../api/dataQuestion";
import { getQuizList } from "../api/quiz";
import { user } from "../api/dataUser";

export function Home() {
  const [category, setCategory] = useState(0);
  const [totalQuestions, setTotalQuesitons] = useState(5);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  function handleTotalQuestions(e) {
    setTotalQuesitons(e.target.value);
  }

  function handleDifficulty(e) {
    setDifficulty(e.target.value);
  }

  function handleType(e) {
    setType(e.target.value);
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  async function handleStart(category, totalQuestions, difficulty, type) {
    const result = await getQuizList(category, totalQuestions, difficulty, type);
    questions.push(...result);
    user.name = username;
    setUsername("");
    setTotalQuesitons(5);
    setCategory(9);
    setDifficulty("");
    setType("");
  }

  return (
    <div className="background">
      <h1>Quiz App</h1>
      <div className="container-home">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name" className="label">
            Username
          </label>
          <input type="text" id="name" name="name" className="input-name" required onChange={handleUsername} value={username} />
          <label htmlFor="total-questions" className="label">
            Number of Questions
          </label>
          <select name="total-questions" id="total-questions" className="select" value={totalQuestions} onChange={handleTotalQuestions}>
            <option value="">Choose Total Questions</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <label htmlFor="category" className="label">
            Category
          </label>
          <select name="category" id="category" className="select" value={category} onChange={handleCategory}>
            <option value="">Choose Category</option>
            <option value={9}>General Knowledge</option>
            <option value={10}>Entertainment: Books</option>
            <option value={11}>Entertainment: Film</option>
            <option value={12}>Entertainment: Music</option>
            <option value={13}>Entertainment: Musicals & Theatres</option>
            <option value={14}>Entertainment: Television</option>
            <option value={15}>Entertainment: Video Games</option>
            <option value={16}>Entertainment: Board Games</option>
            <option value={17}>Science Nature</option>
            <option value={18}>Science: Computers</option>
          </select>
          <label htmlFor="difficulty" className="label">
            Difficulty
          </label>
          <select name="difficulty" id="difficulty" className="select" value={difficulty} onChange={handleDifficulty}>
            <option value="">Choose Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="type" className="label">
            Type
          </label>
          <select name="type" id="type" className="select" value={type} onChange={handleType}>
            <option value="">Choose type</option>
            <option value="multiple">Multiple choice</option>
            <option value="boolean">True / False</option>
          </select>
          <Link to="/play" className="link">
            <button className="button-home" onClick={() => handleStart(category, totalQuestions, difficulty, type)}>
              Start
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
