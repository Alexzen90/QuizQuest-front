import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Quiz } from "../../Module/Quiz/quizType";

export const ThemeChoice = () => {

  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    setQuizzes(savedQuizzes)
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-full">
      <h1 className="text-3xl text-center font-bold text-white mt-20">
        Choisissez un thème
      </h1>
      <div className="grid grid-cols-4 gap-8 text-xl text-white">
        <p>Jeux vidéo</p>
        <p>Jeux de sociéte</p>
        <p>Jeux de rôle</p>
        <p>Jeux de stratégie</p>
        <p>Jeux de plateau</p>
        <p>Jeux de cartes</p>
        <p>Jeux de construction</p>
        <p>Séries tv</p>
        <p>Jeux de l'espace</p>
        <p>Jeux de l'informatique</p>
        <p>Jeux de l'esport</p>
        <p>Jeux de l'aventure</p>
        {quizzes.map((quiz, index) => (
          <p key={index}>{quiz.name}</p>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <NavLink to={"/quizcreation"}>
          <button
            type="submit"
            className="min-w-96 w-1/4 bg-purple-700 hover:bg-purple-800 text-white text-2xl 
            font-bold py-2 px-4 rounded-md mt-4"
          >
          Créer un quiz
          </button>
        </NavLink>
        <button
          type="submit"
          className="min-w-96 w-1/4 bg-amber-500 hover:bg-amber-700 text-white text-2xl 
          font-bold py-2 px-4 rounded-md mt-10"
        >
        C'est parti !
        </button>
      </div>
      <div>
        <NavLink
          to="/modechoice"
          className="mt-28 text-white text-2xl hover:underline"
        >
          Retour au choix du mode
        </NavLink>
      </div>
    </div>
  );
};
