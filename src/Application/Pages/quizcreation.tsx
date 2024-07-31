import React, { useState } from "react"
import { CreateQuestion } from "../Composants/CreateQuestion"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router-dom"
import { Difficulty, QuestionData } from "../../Module/Quiz/quizType"

export const QuizCreation = () => {
  const [name, setName] = useState('')
  const [categorie, setCategorie] = useState('')
  const [questions, setQuestions] = useState({})

  const [difficultyCounts, setDifficultyCounts] = useState({
    facile: 0,
    moyen: 0,
    difficile: 0
  })

  const [prevDifficulties, setPrevDifficulties] = useState({})

  const navigate = useNavigate()

  const questionNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const updateQuestion = (number: string, questionData: QuestionData) => {
    setQuestions(prevQuestions => ({
      ...prevQuestions,
      [`question${number}`]: questionData
    }))

    setDifficultyCounts(prevCounts => {
      const newCounts = { ...prevCounts }
      const prevDifficulty = prevDifficulties[number as keyof typeof prevDifficulties]

      if (prevDifficulty && prevDifficulty !== questionData.difficulty) {
        newCounts[prevDifficulty as Difficulty] -= 1
      }

      if (questionData.difficulty) {
        newCounts[questionData.difficulty as Difficulty] += 1
      }
      return newCounts
    })

    setPrevDifficulties(prev => ({
      ...prev,
      [number]: questionData.difficulty
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const quizData = {
      name,
      categorie,
      ...questions
    }
    http.post('/quiz', quizData)
    .then(response => {
      console.log(response)
      // Save quiz to local storage
      const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
      savedQuizzes.push(quizData)
      localStorage.setItem('quizzes', JSON.stringify(savedQuizzes))
    })
    .catch(error => {
      console.log(error)
    }).finally(() => navigate('/themechoice'))      
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form className=" w-1/3 p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl mt-5" htmlFor="name">Choisissez un nom pour votre quiz</label>
        <input className="w-full p-2 mb-10 rounded-md" type="text" placeholder="Nom du quiz"
        onChange={(e) => setName(e.target.value)}/>

        <label className="block text-white font-bold text-2xl" htmlFor="theme">Choisissez une catégorie pour votre quiz</label>
        <input className="w-full p-2 mb-10 rounded-md" type="text" placeholder="Nom de la catégorie"
        onChange={(e) => setCategorie(e.target.value)}/>

        <p className="text-amber-300 text-xl mb-10">Vous allez créer 10 questions: 4 de niveau facile, 3 de niveau moyen et 3 de niveau difficile.</p>

        <h1 className="text-4xl mb-7 text-center text-white">Créez vos questions</h1>

        {
          questionNumber.map((number) => (
            <CreateQuestion key={number} questionNumber={number} updateQuestion={updateQuestion} difficultyCounts={difficultyCounts} />
          ))
        }

        <div className="flex justify-center">
          <button type="submit"
            className="min-w-96 w-1/4 bg-amber-500 hover:bg-amber-700 text-white text-2xl 
            font-bold py-2 px-4 rounded-md my-10"
          >
          Créer le quiz
          </button>
        </div>        
      </form>
    </div>
  )
}