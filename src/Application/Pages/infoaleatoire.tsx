import { NavLink, useNavigate } from "react-router-dom"

export const Infoaleatoire = () => {

  const navigate = useNavigate()

  return(
    <>
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-1/3 p-7 text-2xl mb-10 font-medium bg-white rounded-3xl">
        <p>Comme son nom l'indique le mode aléatoire permet de jouer sans choisir de thème ni de quiz.</p>
        <br />
        <p>Vous pouvez répondre a des questions qui seront totalement aléatoires, aussi bien au niveau des thèmes qu'au niveau de la difficulté des questions.</p>
        <br />
        <p>Il n'y a pas de limite de temps contrairement au mode classic
        et vos résultats n'affecteront pas votre classement.</p>
        <br />
        <p className="text-center font-bold">Choisir ce mode?</p>
      </div>
      <div className="w-1/3 mt-2 items-center flex justify-center">
        <button className="text-white text-xl py-2 px-4 hover:underline w-1/3"><NavLink to="/modechoice">Retour</NavLink></button>
        <button className="text-white text-xl py-2 px-4 bg-green-600 hover:bg-green-800 rounded-lg w-1/3"
          onClick={() => navigate('/Quizrandomdisplay')}>Continuer</button>
      </div>
    </div>
    </>
  )
}