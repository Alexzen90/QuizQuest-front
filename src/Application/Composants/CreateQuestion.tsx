import { useEffect, useState } from 'react'
import { QuestionData } from '../../Module/Quiz/quizType'

type Props = {
  questionNumber: string
  updateQuestion: (number: string, questionData: QuestionData) => void
  difficultyCounts: { facile: number, moyen: number, difficile: number }
}

export const CreateQuestion = (props: Props) => {

  const [difficulty, setDifficulty] = useState('')
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([])

  useEffect(() => {
    props.updateQuestion(props.questionNumber, {
      difficulty,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers
    })
  }, [difficulty, question, correctAnswer, incorrectAnswers])

  return (
    <div className=" border-2 border-solid border-white p-5 mb-4">
      <select className="rounded-md" name="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">--Choisissez une difficulté--</option>
        <option value="facile" disabled={props.difficultyCounts.facile >= 4}>Facile</option>
        <option value="moyen" disabled={props.difficultyCounts.moyen >= 3}>Moyen</option>
        <option value="difficile" disabled={props.difficultyCounts.difficile >= 3}>Difficile</option>
      </select>

      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="question1">Question {props.questionNumber}</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez votre question"
      onChange={(e) => setQuestion(e.target.value)}/>
      
      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="bonnereponse">Bonne réponse</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez la bonne réponse"
      onChange={(e) => setCorrectAnswer(e.target.value)}/>

      <label className="block text-white font-bold text-2xl pt-5 px-3" htmlFor="mauvaisesreponses">Mauvaises réponses</label>
      <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Écrivez 3 mauvaises réponses, séparées par des virgules et un espace"
      onChange={(e) => setIncorrectAnswers(e.target.value.split(', '))}/>
    </div>
  )
}