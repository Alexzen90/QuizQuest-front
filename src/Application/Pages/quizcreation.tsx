import React, { useState } from "react"
import { CreateQuestion } from "../Composants/CreateQuestion"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router-dom"
import { QuestionData } from "../../Module/Quiz/quizType"

export const QuizCreation = () => {
  const [name, setName] = useState('')
  const [categorie, setCategorie] = useState('')
  const [questions, setQuestions] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

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
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value
    setName(inputName)

    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    if (savedQuizzes.some((quiz: any) => quiz.name === inputName)) {
      setErrorMessage('Ce nom existe déjà, choisissez-en un autre !')
    } else {
      setErrorMessage('')
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const quizData = {
      name,
      categorie,
      ...questions
    };

    const questionData = {
      ...questions
    }

    const saveToLocalStorage = () => {
      try {
        const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    
        if (savedQuizzes.some((quiz: any) => quiz.name === quizData.name)) {
          setErrorMessage('Il existe déjà un quiz avec ce nom');
          return false;
        }
    
        savedQuizzes.push(quizData);
        localStorage.setItem('quizzes', JSON.stringify(savedQuizzes));
    
        const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        if (!savedCategories.includes(quizData.categorie)) {
          savedCategories.push(quizData.categorie);
          localStorage.setItem('categories', JSON.stringify(savedCategories));
        }
    
        return true;
      } catch (error) {
        console.error('Error saving to local storage:', error);
        setErrorMessage('Erreur lors de la sauvegarde. Veuillez réessayer.');
        return false;
      }
    };

    const questionDataArray = Object.entries(quizData).map(([key, value]) => {
      if (key.startsWith('question')) {
        return value;
      }
      return null; // Ignore non-question properties
    }).filter(Boolean); // Remove null values
    
    console.log(questionDataArray);

    try {
      const quizResponse = await http.post('/quiz', quizData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      console.log('Quiz creation response:', quizResponse);
  
      const questionResponse = await http.post('/questions', questionDataArray, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
      console.log('Question creation response:', questionResponse);
      console.log('Questions:', questionData);
  
      const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      if (!savedCategories.includes(quizData.categorie)) {
        const categoryResponse = await http.post('/categorie', { name: quizData.categorie }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } });
        console.log('Category creation response:', categoryResponse);
      }
  
      if (saveToLocalStorage()) {
        navigate('/themechoice');
      }
    } catch (error) {
      console.error('Error creating quiz or questions:', error);
      setErrorMessage('Une erreur est survenue lors de la création du quiz. Veuillez réessayer.');
    }


        
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form className="w-1/3 p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl mt-5" htmlFor="name">Choisissez un nom pour votre quiz</label>
        <input className="w-full p-2 mb-2 rounded-md" type="text" placeholder="Nom du quiz"
          onChange={handleNameChange} required />
        {errorMessage && <p className="text-amber-500 text-xl mb-5">{errorMessage}</p>}

        <label className="block text-white font-bold text-2xl mt-5" htmlFor="theme">Choisissez une catégorie pour votre quiz</label>
        <input className="w-full p-2 mb-10 rounded-md" type="text" placeholder="Nom de la catégorie"
          onChange={(e) => setCategorie(e.target.value)} />

        <p className="text-amber-300 text-xl mb-10">Vous allez créer 10 questions: 4 de niveau facile, 3 de niveau moyen et 3 de niveau difficile.</p>

        <h1 className="text-4xl mb-7 text-center text-white">Créez vos questions</h1>

        {
          questionNumber.map((number) => (
            <CreateQuestion key={number} questionNumber={number} updateQuestion={updateQuestion} difficulty={updateDifficulty(number)} />
          ))
        }

        <div className="flex justify-center">
          <button type="submit"
            className="min-w-96 w-1/4 bg-amber-500 hover:bg-amber-700 text-white text-2xl 
            font-bold py-2 px-4 rounded-md my-10"
            disabled={!!errorMessage}
          >
            Créer le quiz
          </button>
        </div>
      </form>
    </div>
  );
};
