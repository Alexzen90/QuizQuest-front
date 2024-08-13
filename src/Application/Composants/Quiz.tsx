import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Question, QuizFull } from "../../Module/Types/quizType";
import { http } from "../../Infrastructure/Http/axios.instance";
import { NavLink } from "react-router-dom";
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
    http
      .get<QuizFull>("/quiz/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const fetchedQuiz = response.data;

        const shuffledQuestions = [
          {
            difficulty: fetchedQuiz.questions[0].difficulty,
            question: fetchedQuiz.questions[0].question,
            options: shuffleArray([fetchedQuiz.questions[0].correct_answer, ...fetchedQuiz.questions[0].incorrect_answers]),
            answer: fetchedQuiz.questions[0].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[1].difficulty,
            question: fetchedQuiz.questions[1].question,
            options: shuffleArray([fetchedQuiz.questions[1].correct_answer, ...fetchedQuiz.questions[1].incorrect_answers]),
            answer: fetchedQuiz.questions[1].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[2].difficulty,
            question: fetchedQuiz.questions[2].question,
            options: shuffleArray([fetchedQuiz.questions[2].correct_answer, ...fetchedQuiz.questions[2].incorrect_answers]),
            answer: fetchedQuiz.questions[2].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[3].difficulty,
            question: fetchedQuiz.questions[3].question,
            options: shuffleArray([fetchedQuiz.questions[3].correct_answer, ...fetchedQuiz.questions[3].incorrect_answers]),
            answer: fetchedQuiz.questions[3].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[4].difficulty,
            question: fetchedQuiz.questions[4].question,
            options: shuffleArray([fetchedQuiz.questions[4].correct_answer, ...fetchedQuiz.questions[4].incorrect_answers]),
            answer: fetchedQuiz.questions[4].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[5].difficulty,
            question: fetchedQuiz.questions[5].question,
            options: shuffleArray([fetchedQuiz.questions[5].correct_answer, ...fetchedQuiz.questions[5].incorrect_answers]),
            answer: fetchedQuiz.questions[5].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[6].difficulty,
            question: fetchedQuiz.questions[6].question,
            options: shuffleArray([fetchedQuiz.questions[6].correct_answer, ...fetchedQuiz.questions[6].incorrect_answers]),
            answer: fetchedQuiz.questions[6].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[7].difficulty,
            question: fetchedQuiz.questions[7].question,
            options: shuffleArray([fetchedQuiz.questions[7].correct_answer, ...fetchedQuiz.questions[7].incorrect_answers]),
            answer: fetchedQuiz.questions[7].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[8].difficulty,
            question: fetchedQuiz.questions[8].question,
            options: shuffleArray([fetchedQuiz.questions[8].correct_answer, ...fetchedQuiz.questions[8].incorrect_answers]),
            answer: fetchedQuiz.questions[8].correct_answer
          },
          {
            difficulty: fetchedQuiz.questions[9].difficulty,
            question: fetchedQuiz.questions[9].question,
            options: shuffleArray([fetchedQuiz.questions[9].correct_answer, ...fetchedQuiz.questions[9].incorrect_answers]),
            answer: fetchedQuiz.questions[9].correct_answer
          }
          
        ];
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
    console.log(questions)
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
    <div >
      <div className="">
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
            <NavLink to="/themechoice" className="mt-28 text-2xl hover:underline">
              Retour au choix des catégories
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center gap-10">
          <Timer 
            onTimeUp={() => setTimeout(() => handleValidateAnswer(true), 0)}
            resetKey={resetKey}
            isPaused={isTimerPaused}
            />
          <h2>{questions[currentQuestion]?.question}</h2>
          <ul className="grid grid-cols-2 gap-4">
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
                    : "bg-gray-100 hover:bg-gray-200"
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
                  isAnswerSelected ? "bg-sky-700 text-white" : "bg-sky-700 opacity-70 text-gray-900 cursor-not-allowed"
                }`}
                disabled={!isAnswerSelected}>
                Valider
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-center">{validationMessage}</p>
              <button onClick={handleNextQuestion} className="mt-8 p-2 w-1/2 bg-sky-700 text-white rounded-3xl">
                Question suivante
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
