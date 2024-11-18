import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Question, QuestionData } from "../../Module/Types/quizType";
import { http } from "../../Infrastructure/Http/axios.instance";
import { shuffleArray } from "../Utils/shuffleArray";
import { Timer } from "./Timer";

export const Quiz = () => {
  const { id } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showScore, setShowScore] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [validated, setValidated] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [validationMessage, setValidationMessage] = useState("")
  const [resetKey, setResetKey] = useState(0)
  const [isTimerPaused, setIsTimerPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    http.get("/questions_by_filters", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, params: { q: {id} } })
      .then((response) => {
        const fetchedQuestions = response.data.results;

        const shuffledQuestions = fetchedQuestions.map((question: QuestionData) => ({
          difficulty: question.difficulty,
          question: question.question,
          options: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
          answer: question.correct_answer
        }))
        setQuestions(shuffledQuestions)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  const handleAnswerSelection = (questionIndex: number, selectedAnswer: string) => {
    if (!validated) {
      const updatedAnswers = [...answers]
      updatedAnswers[questionIndex] = selectedAnswer
      setAnswers(updatedAnswers)
    }
  };

  const handleValidateAnswer = (isTimeUp = false) => {
    if (questions.length === 0) return
    const correct = questions[currentQuestion]?.answer
    setCorrectAnswer(correct ?? "")
    
    if (isTimeUp) {
      setValidationMessage("Temps ecoulé !")
    } else if (answers[currentQuestion] === correct) {
      setScore(score + 1)
      setValidationMessage("Bonne reponse !")
    } else {
      setValidationMessage("Mauvaise reponse !")
    }

    setValidated(true)
    setIsTimerPaused(true)
  };

  
  const handleNextQuestion = () => {
    setValidated(false)
    setCorrectAnswer("")
    setIsTimerPaused(false)
    setResetKey((prev) => prev + 1)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  };

  const isAnswerSelected = answers[currentQuestion] !== undefined
  const barProgress = ((currentQuestion + 1) / questions.length) * 100

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white rounded-2xl w-[600px]">
      <div>
        <div className="bg-gray-200 h-2 mb-2 mt-4 mx-4">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${barProgress}%` }}
          ></div>
        </div>
      </div>
      <p className="mb-4 mr-4 text-end">{currentQuestion + 1}/{questions.length}</p>

      {showScore ? (
        <div className="flex flex-col text-center gap-10">
          <h2 className="text-3xl">Quiz terminé !</h2>
          <h3 className="text-2xl mb-4">
            Votre score est de {score} / {questions.length}
          </h3>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center gap-10">
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-sky-900 to-sky-600 animate-spin">
                <div className="h-9 w-9 rounded-full bg-white flex justify-center items-center">
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Timer
                  onTimeUp={() => setTimeout(() => handleValidateAnswer(true), 0)}
                  resetKey={resetKey}
                  isPaused={isTimerPaused}
                />
              </div>
            </div>
          </div>
          <h2 className="p-2">{questions[currentQuestion]?.question}</h2>
          <ul className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            {questions[currentQuestion]?.options.map((option, index) => (
              <li
                key={index}
                className={`w-96 flex items-center justify-between p-4 rounded-2xl cursor-pointer ${
                  validated && option === correctAnswer
                    ? "bg-green-500 text-white"
                    : validated && answers[currentQuestion] === option
                    ? "bg-red-500 text-white"
                    : answers[currentQuestion] === option
                    ? "bg-green-500 text-white"
                    : "bg-sky-100 hover:bg-sky-200"
                }`}
                onClick={() => handleAnswerSelection(currentQuestion, option)}
              >
                <label>{option}</label>
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  checked={answers[currentQuestion] === option}
                  value={option}
                  onChange={() => handleAnswerSelection(currentQuestion, option)}
                  className="hidden"
                />
              </li>
            ))}
          </ul>
          {!validated ? (
            <div className="flex justify-center mb-4">
              <button 
                onClick={() => handleValidateAnswer()} 
                className={`mt-4 p-2 w-1/2 rounded-3xl ${
                  isAnswerSelected ? "bg-sky-700 text-white w-80" : "bg-sky-700 opacity-70 w-80 text-gray-900 cursor-not-allowed"
                }`}
                disabled={!isAnswerSelected}>
                Valider
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-center">{validationMessage}</p>
              <button onClick={handleNextQuestion} className="mt-4 mb-4 p-2 w-80 bg-sky-700 text-white rounded-3xl">
                Question suivante
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
