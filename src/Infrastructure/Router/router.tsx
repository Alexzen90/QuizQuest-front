import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/Informations.tsx'
import { SignUp } from '../../Application/Pages/Signup.tsx'
import { Login } from '../../Application/Pages/Login.tsx'
import { ForgotPassword } from '../../Application/Pages/Forgotpassword.tsx'
import { ModeChoice } from '../../Application/Pages/Modechoice.tsx'
import { Infoaleatoire } from '../../Application/Pages/Infoaleatoire.tsx'
import { ThemeChoice } from '../../Application/Pages/Themechoice.tsx'
import { QuizCreation } from '../../Application/Pages/Quizcreation.tsx'
import { QuizCategoriePage } from '../../Application/Pages/QuizCategoriePage.tsx'
import { QuizSelectionPage } from '../../Application/Pages/QuizSelectionPage.tsx'
import { QuizDisplay } from '../../Application/Pages/QuizDisplay.tsx'
import { Policy } from '../../Application/Pages/Policy.tsx'
import { QuizrandomDisplay } from '../../Application/Pages/QuizrandomDisplay.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/policy',
        element: <Policy />
      },
      {
        path: '/informations',
        element: <Informations />
      },
      {
        path: '/modechoice',
        element: <ModeChoice />
      },
      {
        path: '/infoaleatoire',
        element: <Infoaleatoire />
      },
      {
        path: '/themechoice',
        element: <ThemeChoice />
      },
      {
        path: '/quizcreation',
        element: <QuizCreation />
      },
      {
        path: '/themechoice/:categorie',
        element: <QuizCategoriePage />
      },
      {
        path: '/themechoice/:categorie/:name',
        element: <QuizSelectionPage />
      }
    ]
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: '/quizrandomdisplay',
    element: <QuizrandomDisplay />
  },
  {
    path: '/themechoice/:categorie/:name/:id',
    element: <QuizDisplay />
  }
])