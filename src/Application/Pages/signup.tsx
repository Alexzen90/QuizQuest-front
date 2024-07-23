import React from "react"
import { useState } from "react"
import { http } from "../../Infrastructure/Http/axios.instance"
import { useNavigate } from "react-router"

export const SignUp = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http.post('/user', { username, email, password })
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    }).finally(() => navigate('/login'))
  }  

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-5 border-solid rounded-3xl flex flex-col" onSubmit={handleSubmit}>
        <label className="block" htmlFor="username">Username</label>
        <input className="w-full p-2 mb-7 rounded-md" type="text" placeholder="username" 
        onChange={(e) => setUsername(e.target.value)}/>

        <label className="block" htmlFor="email">Email</label>
        <input className="w-full p-2 mb-7 rounded-md" type="email" autoComplete="off" placeholder="email" 
        onChange={(e) => setEmail(e.target.value)}/>

        <label className="block" htmlFor="password">Password</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" 
        onChange={(e) => setPassword(e.target.value)}/>

        <div>
          <button type="submit" className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-40">S'inscrire</button>
        </div>
      </form>
    </div>
  )
}