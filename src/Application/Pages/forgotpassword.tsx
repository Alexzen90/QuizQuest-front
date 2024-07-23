import { NavLink } from "react-router-dom"

export const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-5 border-solid rounded-3xl flex flex-col justify-between items-center gap-10">
        <h1 className="text-4xl text-center text-white">Mot de passe oublié ?</h1>
        <p className="text-white text-2xl">Nous vous enverrons un mail avec un lien pour réinitialiser votre mot de passe.</p>
        <div className="flex w-full items-end justify-center gap-10">
          <div>
            <label htmlFor="email" className="block text-white font-bold text-2xl">Adresse mail</label>
            <input type="text" id="email" placeholder="Entrez votre adresse mail" className="w-96 p-2 rounded-md" />
          </div>
          <div>
            <button className="text-white text-xl  py-2 px-4 bg-black hover:underline rounded-lg">Réinitialiser le mot de passe</button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 items-center ">
          <p className="text-white text-xl">Vous n'avez pas de compte ?</p>
          <NavLink to="/signup" className="text-white text-2xl underline">Inscrivez-vous</NavLink>
        </div>
        <NavLink to="/login" className="text-white text-2xl mt-12 hover:underline">Revenir à la page de connexion</NavLink>
      </form>
    </div>
  )
}