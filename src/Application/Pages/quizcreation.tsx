import React, { useState } from "react"
import { CreateQuestion } from "../Composants/CreateQuestion"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router"

const navigate = useNavigate()

export const QuizCreation = () => {
  const [name, setName] = useState('')
  const [categorie, setCategorie] = useState('')

  const questionNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http.post('/quiz', { name, categorie })  //A COMPLETER AVEC MES QUESTIONS DU COMPOSANT
    .then(response => {
      console.log(response)
    }).catch(error => {
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
            <CreateQuestion questionNumber={number} />
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