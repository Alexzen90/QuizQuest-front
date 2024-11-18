import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { http } from "../../Infrastructure/Http/axios.instance";
import { QuizInfos } from "../../Module/Types/quizType";


export const QuizCategoriePage = () => {
  const { categorie } = useParams();
  const [catId, setCatId] = useState([]);
  const [quizzes, setQuizzes] = useState<QuizInfos[]>([]);

  useEffect(() => {
    http.get('/categories_by_filters', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }, params: { q: categorie} })
      .then((response) => {
        const savedCategorieId = response.data.results[0]._id;
        setCatId(savedCategorieId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categorie])

  useEffect(() => {
    http.get('/quizzes_by_filters', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }, params: { q: catId} })
      .then((response) => {
        const savedQuizzes = response.data.results;
        setQuizzes(savedQuizzes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [catId]);

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-full">
      <h1 className="text-3xl text-center font-bold text-white mt-20 mb-10">Choisissez un quiz dans la catégorie {categorie} </h1>
      <div className={`grid ${quizzes.length < 4 ? 'grid-cols-' + quizzes.length : 'grid-cols-4'} gap-8 text-xl text-center text-white justify-items-center`}>
        {quizzes
        .map((quiz, index) => (
            <NavLink
                to={`/themechoice/${categorie}/${quiz.name}`}
                key={index}
                className="relative min-w-80 p-6 bg-gradient-to-r from-indigo-700 to-purple-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
                <p className="relative z-10">{quiz.name}</p>
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-10 rounded-lg"></div>
            </NavLink>
        ))}
      </div>
      <div className="mt-48">
        <NavLink
          to="/themechoice"
          className="text-white text-2xl hover:underline"
        >
          Retour au choix des catégories
        </NavLink>
      </div>
    </div>
  );
};
