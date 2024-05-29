import React from 'react'
import "./EndGame.css"

interface EndGameProps {
    score: number;
    totalQuestions:number;
    onTryAgainSubmit: () => void;
  }


const EndGame = ({score, totalQuestions, onTryAgainSubmit}:EndGameProps) => {
  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100 flex-column gap-3'>
    <h1>Game Over</h1>
    <h2 className='score-text'>Total Score: {score}</h2>
    <h4 className='questions-text'>Total Questions Answerd: {totalQuestions}</h4>
    <button type="button"  className="btn btn-primary" onClick={()=> (onTryAgainSubmit())}>Try Again</button>
    </div> 

  )
}

export default EndGame