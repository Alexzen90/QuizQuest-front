import { NavLink } from "react-router-dom"

export const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-5 border-solid rounded-3xl flex flex-col">
        <label className="block" htmlFor="username">Username</label>
        <input className="w-full p-2 mb-7 rounded-md" type="text" placeholder="username" />

        <label className="block" htmlFor="email">Email</label>
        <input className="w-full p-2 mb-7 rounded-md" type="email" autoComplete="off" placeholder="email" />

        <label className="block" htmlFor="password">Password</label>
        <input className="w-full p-2 rounded-md" type="password" placeholder="*********" />

        <div>
          <NavLink to="/login">
          <button className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded-md mt-40">S'inscrire</button>
          </NavLink>
        </div>
      </form>
    </div>
  )
}