
import "./App.css";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";

function App() {
  return (
      <div>
        <div className="w-100 d-flex justify-content-center main-heading"><h3>Quizzy by Akhil Ishwarlaal</h3></div>
      <QuestionContainer numberOfQuestions={10} />

      </div>
  );
}

export default App;
