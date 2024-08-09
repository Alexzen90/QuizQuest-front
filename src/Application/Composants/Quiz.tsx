import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Question, QuizFull } from "../../Module/Quiz/quizType";
import { http } from "../../Infrastructure/Http/axios.instance";
import { NavLink } from "react-router-dom";
import { shuffleArray } from "../Utils/shuffleArray";

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

  useEffect(() => {
    http
      .get<QuizFull>("/quiz/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const fetchedQuiz = response.data;

        const shuffledQuestions = [
          {
            difficulty: fetchedQuiz.question1.difficulty,
            question: fetchedQuiz.question1.question,
            options: shuffleArray([fetchedQuiz.question1.correct_answer, ...fetchedQuiz.question1.incorrect_answers]),
            answer: fetchedQuiz.question1.correct_answer
          },
          {
            difficulty: fetchedQuiz.question2.difficulty,
            question: fetchedQuiz.question2.question,
            options: shuffleArray([fetchedQuiz.question2.correct_answer, ...fetchedQuiz.question2.incorrect_answers]),
            answer: fetchedQuiz.question2.correct_answer
          },
          {
            difficulty: fetchedQuiz.question3.difficulty,
            question: fetchedQuiz.question3.question,
            options: shuffleArray([fetchedQuiz.question3.correct_answer, ...fetchedQuiz.question3.incorrect_answers]),
            answer: fetchedQuiz.question3.correct_answer
          },
          {
            difficulty: fetchedQuiz.question4.difficulty,
            question: fetchedQuiz.question4.question,
            options: shuffleArray([fetchedQuiz.question4.correct_answer, ...fetchedQuiz.question4.incorrect_answers]),
            answer: fetchedQuiz.question4.correct_answer
          },
          {
            difficulty: fetchedQuiz.question5.difficulty,
            question: fetchedQuiz.question5.question,
            options: shuffleArray([fetchedQuiz.question5.correct_answer, ...fetchedQuiz.question5.incorrect_answers]),
            answer: fetchedQuiz.question5.correct_answer
          },
          {
            difficulty: fetchedQuiz.question6.difficulty,
            question: fetchedQuiz.question6.question,
            options: shuffleArray([fetchedQuiz.question6.correct_answer, ...fetchedQuiz.question6.incorrect_answers]),
            answer: fetchedQuiz.question6.correct_answer
          },
          {
            difficulty: fetchedQuiz.question7.difficulty,
            question: fetchedQuiz.question7.question,
            options: shuffleArray([fetchedQuiz.question7.correct_answer, ...fetchedQuiz.question7.incorrect_answers]),
            answer: fetchedQuiz.question7.correct_answer
          },
          {
            difficulty: fetchedQuiz.question8.difficulty,
            question: fetchedQuiz.question8.question,
            options: shuffleArray([fetchedQuiz.question8.correct_answer, ...fetchedQuiz.question8.incorrect_answers]),
            answer: fetchedQuiz.question8.correct_answer
          },
          {
            difficulty: fetchedQuiz.question9.difficulty,
            question: fetchedQuiz.question9.question,
            options: shuffleArray([fetchedQuiz.question9.correct_answer, ...fetchedQuiz.question9.incorrect_answers]),
            answer: fetchedQuiz.question9.correct_answer
          },
          {
            difficulty: fetchedQuiz.question10.difficulty,
            question: fetchedQuiz.question10.question,
            options: shuffleArray([fetchedQuiz.question10.correct_answer, ...fetchedQuiz.question10.incorrect_answers]),
            answer: fetchedQuiz.question10.correct_answer
          }
        ];
        setQuestions(shuffledQuestions);
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

  const handleValidateAnswer = () => {
    const correct = questions[currentQuestion]?.answer
    setCorrectAnswer(correct ?? "")
    setValidated(true)
    if (answers[currentQuestion] === correct) {
      setScore(score + 1)
      setValidationMessage("Bonne reponse !")
    } else {
      setValidationMessage("Mauvaise reponse !")
    }
  };

  const isAnswerSelected = answers[currentQuestion] !== undefined

  const handleNextQuestion = () => {
    setValidated(false)
    setCorrectAnswer("")
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  };

  const barProgress = ((currentQuestion + 1) / questions.length) * 100

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
                onClick={handleValidateAnswer} 
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
