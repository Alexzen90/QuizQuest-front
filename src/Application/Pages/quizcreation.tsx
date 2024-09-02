import React, { useState } from "react"
import { CreateQuestion } from "../Composants/CreateQuestion"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router-dom"
import { QuestionData } from "../../Module/Types/quizType"

export const QuizCreation = () => {
  const [name, setName] = useState('')
  const [categorie, setCategorie] = useState('')
  const [questions, setQuestions] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  const questionNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const updateDifficulty = (number: string) => {
    const num = +number;
    if (num < 5) {
      return 'Facile'
    } else if (num < 8) {
      return 'Moyen'
    } else {
      return 'Difficile'
    }
  };

  const updateQuestion = (number: string, questionData: QuestionData) => {
    setQuestions(prevQuestions => ({
      ...prevQuestions,
      [`question${number}`]: questionData
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const quizData = {
      name,
      categorie,
      ...questions
    }

    let isCategoryNew = false
    let currentCategoryId = ''

    try {

      const categoryResponse = await http.get('/categories_by_filters', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }, params: { q: "" } })
      .then(response => response.data.results.map((category: any) => category.name))
      console.log('Category retrieval response:', categoryResponse)
    
      if (categoryResponse.includes(quizData.categorie)) {
        currentCategoryId = categoryResponse.data._id;
      } else {
        // Create new category
        const newCategoryResponse = await http.post('/categorie', { name: quizData.categorie }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
        console.log('Category creation response:', newCategoryResponse)
        currentCategoryId = newCategoryResponse.data._id;
        isCategoryNew = true;
      }

      const quizResponse = await http.post('/quiz', { name: quizData.name, categorie_id: currentCategoryId }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      console.log('Quiz creation response:', quizResponse)

      let quizId = quizResponse.data._id
      let userId = quizResponse.data.user_id

      const questionDataArray = Object.entries(quizData).map(([key, value]) => {
        if (key.startsWith('question')) {
          return {
            ...(value as unknown as object),
            categorie_id: currentCategoryId,
            quiz_id: quizId,
            user_id: userId
          };
        }
        return null // Ignore non-question properties
      }).filter(Boolean) // Remove null values

      const questionResponsePromise = http.post('/questions', questionDataArray, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }})

      questionResponsePromise.then(response => {
        console.log('Question creation response', response)
        if (response.data) {
          setSuccessMessage('Création du quiz réussie !')
          setErrorMessage('')
          setTimeout(() => {
            navigate('/themechoice')
          }, 2000)
        }
      })
    } catch (error) {
      console.error('Error creating quiz or questions:', error);
      setErrorMessage('Le nom de ce quiz existe déjà, choisissez-en un autre !')
      if (isCategoryNew && currentCategoryId) {
        // Delete created category if it's new and there's an error
        const deleteNewCategory =await http.delete(`/categorie/${currentCategoryId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        console.log('Category deletion response:', deleteNewCategory)
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form className="w-1/3 p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl mt-5" htmlFor="name">Choisissez un nom pour votre quiz</label>
        <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Nom du quiz"
          onChange={(e) => setName(e.target.value)} required />

        <label className="block text-white font-bold text-2xl mt-5" htmlFor="theme">Choisissez une catégorie pour votre quiz</label>
        <input className="w-full p-2 mb-10 rounded-md" type="text" placeholder="Nom de la catégorie"
          onChange={(e) => setCategorie(e.target.value)} required />

        <p className="text-amber-300 text-xl mb-10">Vous allez créer 10 questions: 4 de niveau facile, 3 de niveau moyen et 3 de niveau difficile.</p>

        <h1 className="text-4xl mb-7 text-center text-white">Créez vos questions</h1>

        {
          questionNumber.map((number) => (
            <CreateQuestion key={number} questionNumber={number} updateQuestion={updateQuestion} difficulty={updateDifficulty(number)} />
          ))
        }

        <div className="flex flex-col items-center justify-center">
        {errorMessage && <p className="text-amber-500 text-2xl mb-5">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          <button type="submit"
            className="min-w-96 w-1/4 bg-amber-500 hover:bg-amber-700 text-white text-2xl 
            font-bold py-2 px-4 rounded-md my-10"
          >
            Créer le quiz
          </button>
        </div>
      </form>
    </div>
  );
};
