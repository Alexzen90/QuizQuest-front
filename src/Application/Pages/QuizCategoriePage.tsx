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
  }, [])

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
      <h1 className="mt-16 text-white text-2xl">Choisissez un quiz dans la catégorie {categorie} </h1>
      <div className="grid grid-cols-4 gap-8 text-xl text-center text-white">
        {quizzes
        .map((quiz, index) => (
            <NavLink
                to={`/themechoice/${categorie}/${quiz.name}`}
                key={index}
                className="p-5 border-solid rounded-3xl"
            >
                <p>{quiz.name}</p>
            </NavLink>
        ))}
      </div>
      
      <div>
        <NavLink
          to="/themechoice"
          className="mt-28 text-white text-2xl hover:underline"
        >
          Retour au choix des catégories
        </NavLink>
      </div>
    </div>
  );
};
