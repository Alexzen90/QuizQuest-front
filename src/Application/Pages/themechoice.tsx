import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { http } from "../../Infrastructure/Http/axios.instance";
import { SortArray } from "../Utils/SortArray";

export const ThemeChoice = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
     http.get('/categories_by_filters', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        const categorieNames = response.data.results.map((categorie: any) => categorie.name);
        setCategories(categorieNames.sort(SortArray));
      })
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-full">
      <h1 className="text-3xl text-center font-bold text-white mt-20 mb-10">
        Choisissez une catégorie
      </h1>
      <div className="grid grid-cols-4 gap-8 text-xl text-center text-white">       
        {categories.map((categorie, index) => (
          <NavLink 
            key={index} 
            to={`/themechoice/${categorie}`}>
            <p>{categorie}</p>
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
