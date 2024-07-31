import { useNavigate } from "react-router-dom"
import { useAuth } from "./UseAuth"


export const Navigation = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      {isAuthenticated ? (
        <button className="mt-28 text-white text-2xl hover:underline" onClick={handleLogout}>Se déconnecter</button>
      ) : ""}
    </nav>
  )
}