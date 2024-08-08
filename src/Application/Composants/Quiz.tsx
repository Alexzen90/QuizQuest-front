import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { QuizFull } from "../../Module/Quiz/quizType"
import { http } from "../../Infrastructure/Http/axios.instance"

export const Quiz = () => {
  const { id } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showScore, setShowScore] = useState(false)

  const [quiz, setQuiz] = useState<QuizFull | null>(null)

  useEffect(() => {
    http.get('/quiz/' + id, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
    .then((response) => {
      setQuiz(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const questions = [
    {
      difficulty: quiz?.question1.difficulty,
      question: quiz?.question1.question,
      options: [quiz?.question1.correct_answer, quiz?.question1.incorrect_answers[0], quiz?.question1.incorrect_answers[1], quiz?.question1.incorrect_answers[2]],
      answer: quiz?.question1.correct_answer
    },
    {
      difficulty: quiz?.question2.difficulty,
      question: quiz?.question2.question,
      options: [quiz?.question2.correct_answer, quiz?.question2.incorrect_answers[0], quiz?.question2.incorrect_answers[1], quiz?.question2.incorrect_answers[2]],
      answer: quiz?.question2.correct_answer
    },
    {
      difficulty: quiz?.question3.difficulty,
      question: quiz?.question3.question,
      options: [quiz?.question3.correct_answer, quiz?.question3.incorrect_answers[0], quiz?.question3.incorrect_answers[1], quiz?.question3.incorrect_answers[2]],
      answer: quiz?.question3.correct_answer
    },
    {
      difficulty: quiz?.question4.difficulty,
      question: quiz?.question4.question,
      options: [quiz?.question4.correct_answer, quiz?.question4.incorrect_answers[0], quiz?.question4.incorrect_answers[1], quiz?.question4.incorrect_answers[2]],
      answer: quiz?.question4.correct_answer
    },
    {
      difficulty: quiz?.question5.difficulty,
      question: quiz?.question5.question,
      options: [quiz?.question5.correct_answer, quiz?.question5.incorrect_answers[0], quiz?.question5.incorrect_answers[1], quiz?.question5.incorrect_answers[2]],
      answer: quiz?.question5.correct_answer
    },
    {
      difficulty: quiz?.question6.difficulty,
      question: quiz?.question6.question,
      options: [quiz?.question6.correct_answer, quiz?.question6.incorrect_answers[0], quiz?.question6.incorrect_answers[1], quiz?.question6.incorrect_answers[2]],
      answer: quiz?.question6.correct_answer
    },
    {
      difficulty: quiz?.question7.difficulty,
      question: quiz?.question7.question,
      options: [quiz?.question7.correct_answer, quiz?.question7.incorrect_answers[0], quiz?.question7.incorrect_answers[1], quiz?.question7.incorrect_answers[2]],
      answer: quiz?.question7.correct_answer
    },
    {
      difficulty: quiz?.question8.difficulty,
      question: quiz?.question8.question,
      options: [quiz?.question8.correct_answer, quiz?.question8.incorrect_answers[0], quiz?.question8.incorrect_answers[1], quiz?.question8.incorrect_answers[2]],
      answer: quiz?.question8.correct_answer
    },
    {
      difficulty: quiz?.question9.difficulty,
      question: quiz?.question9.question,
      options: [quiz?.question9.correct_answer, quiz?.question9.incorrect_answers[0], quiz?.question9.incorrect_answers[1], quiz?.question9.incorrect_answers[2]],
      answer: quiz?.question9.correct_answer  
    },
    {
      difficulty: quiz?.question10.difficulty,
      question: quiz?.question10.question,
      options: [quiz?.question10.correct_answer, quiz?.question10.incorrect_answers[0], quiz?.question10.incorrect_answers[1], quiz?.question10.incorrect_answers[2]],
      answer: quiz?.question10.correct_answer
    }
  ]

  const handleAnswerSelection = (questionIndex: number, selectedAnswer: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[questionIndex] = selectedAnswer
    setAnswers(updatedAnswers)
  }

  const handleNextQuestion = () => {
    if (answers[currentQuestion] === questions[currentQuestion].answer)
      setScore(score + 1)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div>
      {showScore ? (
        <div>
          <h2>Quiz terminé !</h2>
          <h3>Votre score est de {score} / {questions.length}</h3>
        </div>
      ) : (
        <div className="flex flex-col  text-center gap-10">
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className="flex text-lg justify-between">
                <label>{option}</label>
                <input 
                  type="radio" 
                  name={`question${currentQuestion}`} 
                  checked={answers[currentQuestion] === option}
                  value={option}  
                  onChange={() => option && handleAnswerSelection(currentQuestion, option)}
                 />
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Question suivante</button>
        </div>
      )}
    </div>
  )
}