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


  const navigate = useNavigate()
  const savedUsernames = JSON.parse(localStorage.getItem('Usernames') || '[]')
  const savedEmails = JSON.parse(localStorage.getItem('Emails') || '[]')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUsername = e.target.value
    setUsername(inputUsername)

    const savedUsernames = JSON.parse(localStorage.getItem('Usernames') || '[]');
    if (savedUsernames.some((username: any) => username === inputUsername)) {
      setUsernameErrorMessage("Ce nom d'utilisateur existe déjà, choisissez-en un autre !")
    } else {
      setUsernameErrorMessage('')
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)

    const savedEmails = JSON.parse(localStorage.getItem('Emails') || '[]');
    if (savedEmails.some((email: any) => email === inputEmail)) {
      setEmailErrorMessage("Cet email existe déjà, choisissez-en un autre !")
    } else {
      setEmailErrorMessage('')
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
    http.post('/user', { username, email, name, password })
      .then(response => {
        console.log(response)
  
        if (response.data) {
          savedUsernames.push(response.data.username)
          localStorage.setItem('Usernames', JSON.stringify(savedUsernames))
  
          savedEmails.push(response.data.email)
          localStorage.setItem('Emails', JSON.stringify(savedEmails))
  
          navigate('/login')
        }
      })
      .catch(error => {
        console.error('Error:', error)
  
        let alertTriggered = false
  
        if (savedUsernames.includes(username)) {
          window.alert("Ce nom d'utilisateur est déjà utilisé")
          alertTriggered = true
        }
  
        if (savedEmails.includes(email)) {
          window.alert("Cet email est déjà utilisé")
          alertTriggered = true;
        }
  
        if (!alertTriggered) {
          navigate('/login')
        }
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block text-white font-bold text-2xl" htmlFor="username">Username*</label>
        <input className="w-full p-2 rounded-md" type="text" placeholder="username" 
        onChange={handleUsernameChange} required/>
        {usernameErrorMessage && <p className="text-amber-500 mt-2 text-md">{usernameErrorMessage}</p>}


        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="name">Name</label>
        <input className="w-full p-2 rounded-md" type="text" placeholder="name" 
        onChange={(e) => setName(e.target.value)}/>

        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="email">Email*</label>
        <input className="w-full p-2 rounded-md" type="email" autoComplete="off" placeholder="email" 
        onChange={handleEmailChange} required/>
        {emailErrorMessage && <p className="text-amber-500 mt-2 text-md">{emailErrorMessage}</p>}


        <label className="block text-white font-bold mt-5 text-2xl" htmlFor="password">Password*</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" 
        onChange={(e) => setPassword(e.target.value)} required/>

        <NavLink to="/login" className="mt-2 text-white text-lg hover:underline">Deja inscrit ? Cliquez ici</NavLink>

        <div>
          <button type="submit" className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-40">S'inscrire</button>
        </div>
      </form>
    </div>
  )
}