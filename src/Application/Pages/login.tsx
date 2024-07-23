import { NavLink } from "react-router-dom"


export const Login = () => {
  return (
    <div className="flex justify-center items-center h-full mt-7">
      <form className="p-5 border-solid rounded-3xl flex flex-col">
        <label className="block" htmlFor="username">Username</label>
        <input className="w-full p-2 mb-7 rounded-md" type="text" placeholder="username" />

        <label className="block" htmlFor="password">Password</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" />

        <button className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-20"><NavLink to="/login">Connexion</NavLink></button>
        <NavLink to="/signup" className="mt-2 text-white text-xl hover:underline">Pas encore inscrit ? Cliquez ici</NavLink>
        <NavLink to="/informations" className="mt-14 text-white text-2xl text-center hover:underline">En savoir plus</NavLink>
      </form>
    </div>
  )
}