import React, { useState } from "react"
import { CreateQuestion } from "../Composants/CreateQuestion"

export const QuizCreation = () => {
  const [categorie, setCategorie] = useState('')
  const questionNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  return (
    <div className="flex justify-center items-center h-full">
      <form className=" w-1/3 p-5 border-solid rounded-3xl flex flex-col">
        <label className="block text-white font-bold text-2xl" htmlFor="theme">Choisissez un nom pour votre thème</label>
        <input className="w-full p-2 mb-10 rounded-md" type="text" placeholder="Nom du thème"
        onChange={(e) => setCategorie(e.target.value)}/>

        <p className="text-amber-300 text-xl mb-10">Vous allez créer 10 questions; 4 de niveau facile, 3 de niveau moyen et 3 de niveau difficile.</p>

        <h1 className="text-4xl mb-7 text-center text-white">Créez vos questions</h1>

        {
          questionNumber.map((number) => (
            <CreateQuestion questionNumber={number} />
          ))
        }
        
      </form>
    </div>
  )
}