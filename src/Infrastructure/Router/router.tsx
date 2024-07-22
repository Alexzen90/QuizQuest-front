import { createBrowserRouter } from 'react-router-dom'
import { App } from '../../App.tsx'
import { AppLayout } from '../../Application/Layout/appLayout.tsx'
import { Informations } from '../../Application/Pages/informations.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/login',
        element: <App />
      },
      {
        path: '/informations',
        element: <Informations />
      }
    ]
  }
])