import React from "react"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../../Infrastructure/Http/axios.instance"


export const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http.post('/login', { username, password })
    .then(response => {
      console.log(response)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        navigate('/modechoice')
      }
    }).catch(error => {
      console.log(error)
      setErrorMessage("Ce nom d'utilisateur ou le mot de passe est incorrect.")
      window.alert("Ce nom d'utilisateur ou le mot de passe est incorrect.")
    })
  }

  return (
    <div className="flex justify-center items-center h-full mt-7">
      <form className="p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl" htmlFor="username">Username</label>
        <input className="w-full p-2 mb-7 rounded-md" type="text" placeholder="username" 
        onChange={(e) => setUsername(e.target.value)}/>

        <label className="block text-white font-bold text-2xl" htmlFor="password">Password</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" 
        onChange={(e) => setPassword(e.target.value)}/>

        {errorMessage && <p className="text-amber-500 mt-2">{errorMessage}</p>}

        <div className="flex justify-between">
          <div className="mt-2 flex text-white items-center">
            <input type="checkbox" />
            <label className="ml-1" htmlFor="remember">Se souvenir de moi</label>
          </div>
          <NavLink to="/forgotpassword" className="mt-2 text-white text-lg font-medium hover:underline">Mot de passe oublie ?</NavLink>
        </div>

        <button type="submit" className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-20">Connexion</button>
        <NavLink to="/signup" className="mt-2 text-white text-xl hover:underline">Pas encore inscrit ? Cliquez ici</NavLink>
        <NavLink to="/informations" className="mt-14 text-white text-2xl text-center hover:underline">En savoir plus</NavLink>
      </form>
    </div>
  )
}