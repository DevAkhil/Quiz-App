import  { useEffect, useRef, useState } from 'react'
import "./QuestionContainer.css"
import QuestionCard from '../QuestionCard/QuestionCard'
import axios from 'axios';
import AnswerResult from '../AnswerResult/AnswerResult';
import EndGame from '../EndGame/EndGame';

interface QuestionContainerProps{
    numberOfQuestions:number;
}


interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  interface TriviaResponse {
    response_code: number;
    results: Question[];
  }

const QuestionContainer = ({numberOfQuestions}:QuestionContainerProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (hasFetchedRef.current) return; // Prevent multiple fetches
            hasFetchedRef.current = true;
          try {
            const response = await axios.get<TriviaResponse>(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`);
            setQuestions(response.data.results);
            setLoading(false);
          } catch (error: any) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchQuestions();
      }, [hasFetchedRef.current]);

      const handleAnswerSubmit = (selectedAnswer:string)=>{
        const isCorrect = selectedAnswer == questions[currentQuestion].correct_answer;
        setIsAnswerCorrect(isCorrect );
        if(isCorrect){
            setScore(score +1);
        }

        setShowFeedback(true);
        setTimeout(() => {
            handleNextQuestion();
        }, 3500);

      }

      const handleNextQuestion = ()=>{
        console.log(currentQuestion);
        if((currentQuestion + 1) == numberOfQuestions ){
            setIsGameOver(true);
        }
        else{
            setCurrentQuestion(currentQuestion + 1);
        }
        setShowFeedback(false)

      }
  

      const TryAgain = () => {
        setLoading(true);

        console.log('presed')
        hasFetchedRef.current =false;
        setScore(0);
        setCurrentQuestion(0);
        setIsAnswerCorrect(false);
        setShowFeedback(false);


        setIsGameOver(false);

      }


      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-card">
    <div className="custom-card">
        {isGameOver == true ?  <EndGame score={score} totalQuestions={numberOfQuestions} onTryAgainSubmit={TryAgain}/> : 

       showFeedback ?  <AnswerResult currentQuestionNumber={currentQuestion + 1} score={score} isCorrect={isAnswerCorrect} totalQuestions={numberOfQuestions} correctAnswer={questions[currentQuestion].correct_answer}/> 
       : <QuestionCard question={questions[currentQuestion].question} correctAnswer={questions[currentQuestion].correct_answer} incorrectAnswers={questions[currentQuestion].incorrect_answers} score={score} totalQuestions={numberOfQuestions} currentQuestionNumber={currentQuestion +1} onAnswerSubmit={handleAnswerSubmit} />
        }
    </div>
  </div>
  )
}

export default QuestionContainer