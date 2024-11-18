import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { QuizInfos } from "../../Module/Types/quizType"
import { http } from "../../Infrastructure/Http/axios.instance"

export const QuizSelectionPage = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState<QuizInfos | null>(null)

  useEffect(() => {
    http.get('/quiz', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }, params: { fields: 'name', value: name} })
    .then((response) => {
      setQuiz(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [name])

  return(
    <div className="flex flex-col items-center gap-16 justify-center h-full">
      <h1 className="mt-16 text-white text-4xl">Vous avez choisi le quiz {name}</h1>
      <div className="text-center text-white text-2xl">
        <p>Vous disposez de 15 secondes par question.<br /> La difficulté augmente à partir des questions 5 et 8 respectivement.
        </p>
        <p className="mt-5">Lorsque vous êtes prêt, cliquez sur le bouton pour commencer le quiz.</p>
        <p className="mt-5">Bonne chance.</p>
        </div>
      <div>
        <button
            type="submit"
            onClick={() => navigate(`/themechoice/${quiz?.categorie_id}/${name}/${quiz?._id}`)}
            className="min-w-96 w-1/4 bg-amber-500 hover:bg-amber-700 text-white text-2xl 
            font-bold py-2 px-4 rounded-md mt-5"
          >
          C'est parti !
        </button>
      </div>
      <div>
        <>
          <button 
            className="text-white text-2xl hover:underline"
            onClick={() => navigate(-1)}>Retour au choix des quizzes</button>
        </>
      </div>
    </div>
    
  )
}