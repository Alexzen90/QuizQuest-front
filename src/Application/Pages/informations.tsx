import { NavLink } from "react-router-dom"

export const Informations = () => {
  return(
    <>
    <div className="h-[calc(100vh-230px)] flex flex-col items-center justify-center mt-5">
      <div className="w-2/4 p-7 text-xl text-center mb-5 font-medium bg-white rounded-3xl">
        <p>QuizQuest est une application de quiz interactif qui a pour objectif de vous divertir et de tester vos connaissances sur différents thèmes.</p>
        <br />
        <p>Il vous suffit simplement de sélectionner un thème et vous devrez ensuite répondre à une série de 10 questions sur le thème choisi.</p>
        <br />
        <p>La difficulté des questions augmente progressivement.</p>
        <br />
        <p>Intéressé(e) ? Créez un compte et lancez-vous dans l'aventure !</p>
      </div>
      <NavLink to="/login" className="text-white text-2xl mt-5 hover:underline">Revenir à la page de connexion</NavLink>
    </div>
    </>
  )
}