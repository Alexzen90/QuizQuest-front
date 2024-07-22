import { NavLink } from "react-router-dom"

export const Informations = () => {
  return(
    <>
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-1/3 p-7 text-2xl mb-14 font-bold bg-white rounded-3xl">
        <p>QuizQuest est une application de quiz interactif qui a pour objectif de vous divertir et de tester vos connaissances sur différents thèmes.</p>
        <br />
        <p>Il vous suffit simplement de sélectionner un thème et vous devrez ensuite répondre à une série de questions sur le thème choisi.</p>
        <br />
        <p>Attention la difficulté des questions augmente en fonction de vos performances.</p>
        <br />
        <p>Intéressé(e) ? Créez un compte et lancez-vous dans l'aventure !</p>
      </div>
      <div>
        <NavLink to="/login" className="mt-14 text-white text-2xl hover:underline">Revenir à la page de connexion</NavLink>
      </div>
    </div>
    </>
  )
}