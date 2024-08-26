import React from "react"
import { useState } from "react"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

export const SignUp = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http.post('/user', { username, email, name, password })
      .then(response => {
        console.log(response)
        if (response.data) {
          setUsernameErrorMessage('')
          setEmailErrorMessage('')
          setSuccessMessage('Création du compte réussie !')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data
          if (errorData.fields.username) {
            setUsernameErrorMessage("Ce nom d'utilisateur est déjà utilisé.")
            setEmailErrorMessage("")
          }
          if (errorData.fields.email) {
            setEmailErrorMessage("Cet email est déjà utilisé.")
            setUsernameErrorMessage("")
          }
        } else {
          setUsernameErrorMessage("Une erreur s'est produite.")
          setEmailErrorMessage("Une erreur s'est produite.")
        }
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl" htmlFor="username">Username*</label>
        <input className="w-full p-2 rounded-md" type="text" placeholder="username" 
        onChange={(e) => setUsername(e.target.value)} required/>
        {usernameErrorMessage && <p className="text-amber-500 mt-2">{usernameErrorMessage}</p>}

        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="name">Name</label>
        <input className="w-full p-2 rounded-md" type="text" placeholder="name" 
        onChange={(e) => setName(e.target.value)}/>

        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="email">Email*</label>
        <input className="w-full p-2 rounded-md" type="email" autoComplete="off" placeholder="email" 
        onChange={(e) => setEmail(e.target.value)} required/>
        {emailErrorMessage && <p className="text-amber-500 mt-2">{emailErrorMessage}</p>}

        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="password">Password*</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" 
        onChange={(e) => setPassword(e.target.value)} required/>

        <NavLink to="/login" className="mt-2 text-white text-lg hover:underline">Déjà inscrit ? Cliquez ici</NavLink>

        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

        <div>
          <button type="submit" className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-40">S'inscrire</button>
        </div>
      </form>
    </div>
  )
}
