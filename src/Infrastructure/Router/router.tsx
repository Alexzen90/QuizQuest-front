import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/informations.tsx'
import { SignUp } from '../../Application/Pages/signup.tsx'
import { Login } from '../../Application/Pages/login.tsx'
import { ForgotPassword } from '../../Application/Pages/Forgotpassword.tsx'
import { ModeChoice } from '../../Application/Pages/modechoice.tsx'
import { Infoaleatoire } from '../../Application/Pages/infoaleatoire.tsx'
import { ThemeChoice } from '../../Application/Pages/themechoice.tsx'
import { Questionmoderandom } from '../../Application/Pages/questionmoderandom.tsx'
import { QuizCreation } from '../../Application/Pages/quizcreation.tsx'
import { QuizCategoriePage } from '../../Application/Pages/QuizCategoriePage.tsx'
import { QuizSelectionPage } from '../../Application/Pages/QuizSelectionPage.tsx'
import { QuizDisplay } from '../../Application/Pages/QuizDisplay.tsx'
import { Policy } from '../../Application/Pages/Policy.tsx'

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
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: '/questionrandom',
    element: <Questionmoderandom />
  },
  {
    path: '/quizcreation',
    element: <QuizCreation />
  },
  {
    path: '/themechoice/:categorie/:name/:id',
    element: <QuizDisplay />
  }
])