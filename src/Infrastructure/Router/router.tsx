import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/informations.tsx'
import { SignUp } from '../../Application/Pages/signup.tsx'
import { Login } from '../../Application/Pages/login.tsx'
import { ModeChoice } from '../../Application/Pages/modechoice.tsx'
import { Infoaleatoire } from '../../Application/Pages/infoaleatoire.tsx'
import { ForgotPassword } from '../../Application/Pages/forgotpassword.tsx'
import { ThemeChoice } from '../../Application/Pages/themechoice.tsx'
import { Questionmoderandom } from '../../Application/Pages/questionmoderandom.tsx'
import { QuizCreation } from '../../Application/Pages/quizcreation.tsx'

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
    path: 'questionrandom',
    element: <Questionmoderandom />
  },
  {
    path: 'quizcreation',
    element: <QuizCreation />
  }
])