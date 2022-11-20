import { useState, useEffect, useRef } from "react";
import HomePage from "./components/homePage";
import { Routes, Route } from "react-router-dom";
import TestPanel from "./components/TestPanel";
import "./App.css";
import axios from "axios";
import ResultsPage from "./components/ResultsPage";

function App() {
  const [textObj, setTextObj] = useState();
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  
  const [testObjects, setTestObjects] = useState([]);
  const [canRenderTest, setCanRenderTest] = useState(false);
  const score = useRef(0);

  function handleStart() {
    axios
      .get("http://localhost:3001/getQuizData")
      .then((res) => {
        setTestObjects(res.data.tests);
        console.log(res.data.tests);
        setCanRenderTest(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAnswer() {
    score.current += 1;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage handleStart={handleStart} />} />
        {canRenderTest && (
        <Route
          path="/test"
          element={
            <TestPanel testObjects={testObjects} handleAnswer={handleAnswer} 
            setWrongQuestions={setWrongQuestions} wrongQuestions={wrongQuestions}
            setCorrectQuestions={setCorrectQuestions} correctQuestions={correctQuestions}/>
          }
        />
        )}

        <Route
          path="/results"
          element={<ResultsPage testObjects={testObjects} score={score} wrongQuestions={wrongQuestions} correctQuestions={correctQuestions}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
