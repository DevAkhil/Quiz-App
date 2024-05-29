import React, { useEffect, useState } from "react";
import "./QuestionCard.css";


interface QuestionCardProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  score: number;
  currentQuestionNumber: number;
  totalQuestions:number;
  onAnswerSubmit: (selectedAnswer: string) => void;
}

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const decodeHTML = (html:any) => {
  var txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}


const QuestionCard = ({question, correctAnswer, incorrectAnswers, score,currentQuestionNumber,totalQuestions, onAnswerSubmit} :QuestionCardProps) => {

  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>(() => shuffleArray([correctAnswer, ...incorrectAnswers]));
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    
  useEffect(()=>{

    setShuffledAnswers(shuffleArray([correctAnswer, ...incorrectAnswers]));
    setSelectedAnswer("");

  },[question])

  return (
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-12 col-lg-6">
              <div className="d-flex gap-4 mb-4">
                <span className="badge rounded-pill bg-secondary sub-text">Question: {currentQuestionNumber} / {totalQuestions}</span>
                  <span className="badge rounded-pill bg-primary sub-text">Score: {score}</span>
              </div>
 
              <h1>
                {decodeHTML(question)}
              </h1>
            </div>
            <div className="col-md-12 col-lg-6 h-100 d-flex justify-content-center flex-column gap-5">
              <ul className="list-group w-100 gap-5">
  
                {shuffledAnswers.map((option)=> (
                <li key={option} className={option == selectedAnswer ? "list-group-item active" : "list-group-item"}  onClick={()=> setSelectedAnswer(option)}>{decodeHTML(option)}</li>

                ))}
              </ul>
                  <button type="button" disabled={selectedAnswer == ""} className="btn btn-primary  w-100" onClick={()=> onAnswerSubmit(selectedAnswer)}>Submit Answer</button>
            </div>

          </div>
        </div>
  );
};

export default QuestionCard;
