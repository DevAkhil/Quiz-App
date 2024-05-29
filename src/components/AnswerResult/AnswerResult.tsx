import React, { useEffect, useState } from "react";

import "./AnswerResult.css"

interface AnswerResultProps {
  isCorrect: boolean;
  score: number;
  currentQuestionNumber: number;
  totalQuestions:number;
  correctAnswer:string;
}
const decodeHTML = (html:any) => {
    var txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }
const AnswerResult = ({
  isCorrect,
  score,
  currentQuestionNumber,
  totalQuestions,
  correctAnswer
}: AnswerResultProps) => {

 

  return (
    <div className={`result `}>
      <span className="badge rounded-pill bg-primary sub-text">Score: {score}</span>

      <h1 className={`answer-text ${isCorrect ? "correct" : "incorrect"}`}>{isCorrect ? "Correct!" : "Incorrect!"}</h1>
      {!isCorrect && <h2>The correct answer is: {decodeHTML(correctAnswer)}</h2>}

      <span className="badge rounded-pill bg-secondary sub-text">Question: {currentQuestionNumber} / {totalQuestions}</span>
    </div>
  );
};

export default AnswerResult;
