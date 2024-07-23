import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/informations.tsx'
import { SignUp } from '../../Application/Pages/signup.tsx'
import { Login } from '../../Application/Pages/login.tsx'
import { ModeChoice } from '../../Application/Pages/modechoice.tsx'

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
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])