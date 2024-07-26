import { NavLink } from "react-router-dom"

export const Infoaleatoire = () => {
  return(
    <>
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-1/3 p-7 text-2xl mb-5 font-bold bg-white rounded-3xl">
        <p>Comme son nom l'indique le mode aléatoire permet de jouer sans choisir de thème.</p>
        <br />
        <p>Vous pouvez répondre a des questions qui seront totalement aléatoires, aussi bien au niveau des thèmes des questions qu'au niveau de la difficulté des questions.</p>
        <br />
        <p>Il n'y a pas de limite de temps  contrairement au mode classic
        et vos résultats n'affecteront pas votre classement.</p>
        <br />
        <p className="text-center">Choisir ce mode?</p>
      </div>
      <div className="w-1/3 mt-2 items-center flex justify-center">
        <button className="text-white text-xl py-2 px-4 hover:underline w-1/3"><NavLink to="/modechoice">Retour</NavLink></button>
        <button className="text-white text-xl py-2 px-4 bg-green-600 hover:bg-green-800 rounded-lg w-1/3"><NavLink to="/Questionrandom">Continuer</NavLink></button>
      </div>
    </div>
    </>
  )
}