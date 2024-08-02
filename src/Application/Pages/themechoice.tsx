import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const ThemeChoice = () => {

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
    savedCategories.sort()
    setCategories(savedCategories)
  }, [])

  // const removeSecondcategorie = () => {
  //   try {
  //     const savedquizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  //     if (savedquizzes.length > 1) {
  //       savedquizzes.splice(2, 1); // Remove the third element (index 2)
  //       localStorage.setItem('quizzes', JSON.stringify(savedquizzes));
  //     }
  //   } catch (error) {
  //     console.error("Error updating local storage", error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-full">
      <h1 className="text-3xl text-center font-bold text-white mt-20">
        Choisissez une catégorie
      </h1>
      <div className="grid grid-cols-4 gap-8 text-xl text-center text-white">       
        {categories.map((categorie, index) => (
          <p key={index}>{categorie}</p>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {/* <button
          onClick={removeSecondcategorie}
          className="min-w-96 w-1/4 bg-red-500 hover:bg-red-700 text-white text-2xl 
            font-bold py-2 px-4 rounded-md mt-10"
        >
          Delete Second categorie localStorage
        </button> */}
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
