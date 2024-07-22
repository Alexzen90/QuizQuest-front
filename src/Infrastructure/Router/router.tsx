import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/informations.tsx'
import { SignUp } from '../../Application/Composants/signup.tsx'
import { Login } from '../../Application/Composants/login.tsx'

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
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])