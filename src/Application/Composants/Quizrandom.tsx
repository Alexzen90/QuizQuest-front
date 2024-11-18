import { useEffect, useState } from "react"
import { Question, QuestionData } from "../../Module/Types/quizType"
import { http } from "../../Infrastructure/Http/axios.instance"
import { shuffleArray } from "../Utils/shuffleArray"
import { NavLink } from "react-router-dom"

export const Quizrandom = () => {

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [validated, setValidated] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [validationMessage, setValidationMessage] = useState("")
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    http.get('/questions_by_filters', 
      { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }, 
      params: { q: '', page: 1, pageSize: 0 } })
    .then((response) => {
      console.log(response)
      const fetchedQuestions = response.data.results

      const shuffledQuestions = fetchedQuestions.map((question: QuestionData) => ({
        difficulty: question.difficulty,
        question: question.question,
        options: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
        answer: question.correct_answer
      }))
      setQuestions(shuffleArray(shuffledQuestions) as Question[])
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const handleAnswerSelection = (questionIndex: number, selectedAnswer: string) => {
    if (!validated) {
      const updatedAnswers = [...answers]
      updatedAnswers[questionIndex] = selectedAnswer
      setAnswers(updatedAnswers)
    }
  };

  const handleValidateAnswer = () => {
    if (questions.length === 0) return
    const correct = questions[currentQuestion]?.answer
    setCorrectAnswer(correct ?? "")
    
    if (answers[currentQuestion] === correct) {
      setScore(score + 1)
      setValidationMessage("Bonne reponse !")
    } else {
      setValidationMessage("Mauvaise reponse !")
    }

    setValidated(true)
  }

  const handleNextQuestion = () => {
    setValidated(false)
    setCorrectAnswer("")
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  const isAnswerSelected = answers[currentQuestion] !== undefined
  const barProgress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div>
      <div>
        <div className="bg-gray-200 h-2 mb-2">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${barProgress}%` }}
          ></div>
        </div>
      </div>
      <p className="mb-4 text-end">{currentQuestion + 1}/{questions.length}</p>


      {showScore ? (
        <div className="flex flex-col text-center gap-10">
          <h2 className="text-3xl">Quiz terminé !</h2>
          <h3 className="text-2xl">
            Votre score est de {score} / {questions.length}
          </h3>
          <div className="mt-28">
            <NavLink to="/modechoice" className="mt-28 text-2xl hover:underline">
              Retour au choix du mode
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center gap-10">
          <h2>{questions[currentQuestion]?.question}</h2>
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
            <div className="flex justify-center">
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
              <button onClick={handleNextQuestion} className="mt-8 p-2 w-80 bg-sky-700 text-white rounded-3xl">
                Question suivante
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}