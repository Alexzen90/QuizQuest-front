import { useEffect, useState } from 'react'
import { QuestionData } from '../../Module/Types/quizType'

type Props = {
  questionNumber: string
  updateQuestion: (number: string, questionData: QuestionData) => void
  difficulty: string
}

export const CreateQuestion = (props: Props) => {

  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([])
  const [__, setIncorrectAnswersInput] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    props.updateQuestion(props.questionNumber, {
      difficulty: props.difficulty,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers
    })
  }, [question, correctAnswer, incorrectAnswers])

  const validateIncorrectAnswers = (input: string) => {
    const answers = input.split(', ')
    if (answers.length !== 3) {
      setValidationMessage('Veuillez ajouter 3 possibilités de réponses (exemple: rue, ville, montagne)')
    } else if (answers.includes(correctAnswer)) {
      setValidationMessage("La bonne réponse ne peut pas être la même que l'une des mauvaises réponses")
    } else {
      setValidationMessage('')
      setIncorrectAnswers(answers)
    }
  }

  return (
    <div className="border-2 border-solid border-white p-5 mb-4">
      <p className='text-white font-bold text-xl'>Difficulté : {props.difficulty}</p>

      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="question1">Question {props.questionNumber}</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez votre question"
        onChange={(e) => setQuestion(e.target.value)} required/>
      
      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="bonnereponse">Bonne réponse</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez la bonne réponse"
        onChange={(e) => setCorrectAnswer(e.target.value)} required/>

      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="mauvaisesreponses">Mauvaises réponses</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez 3 mauvaises réponses, séparées par des virgules et un espace"
        onChange={(e) => setIncorrectAnswersInput(e.target.value)}
        onBlur={(e) => validateIncorrectAnswers(e.target.value)}
        required/>
      {validationMessage && <p className="text-amber-500">{validationMessage}</p>}
    </div>
  )
}