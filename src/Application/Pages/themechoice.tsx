import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { http } from "../../Infrastructure/Http/axios.instance";
import { SortArray } from "../Utils/SortArray";

export const ThemeChoice = () => {

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
     http.get('/categories_by_filters', 
      { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        const categorieNames = response.data.results
        .map((categorie: { name: string }) => categorie.name);
        setCategories(categorieNames.sort(SortArray));
      })
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-[calc(100vh-230px)]">
      <h1 className="text-3xl text-center font-bold text-white pt-32">
        Choisissez une catégorie
      </h1>
      <div className={`w-[70%] grid ${
          categories.length < 4
            ? `grid-cols-${categories.length} justify-items-center`
            : 'grid-cols-4 justify-items-center'
        } gap-3 text-xl text-center text-white`}>
        {categories.map((categorie, index) => (
          <NavLink 
            key={index} 
            to={`/themechoice/${categorie}`} 
            className="relative p-6 bg-gradient-to-r w-60 from-amber-700 to-amber-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <p className="relative z-10">{categorie}</p>
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-10 rounded-lg"></div>
          </NavLink>
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
      </div>
      <div className="mb-4">
        <NavLink
          to="/modechoice"
          className="text-white text-2xl hover:underline"
        >
          Retour au choix du mode
        </NavLink>
      </div>
    </div>
  );
};
