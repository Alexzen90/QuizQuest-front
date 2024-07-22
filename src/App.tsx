import { NavLink } from "react-router-dom"

export const App = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-20">
      <div>
        <p className="text-white">Username / Adresse mail</p>
        <input className="min-w-96 p-1" type="text" placeholder="Ex: Lucasdupont@gmail.com"/>
      </div>
      <div className="mt-7">
        <p className="text-white">Mot de passe</p>
        <input className="min-w-96 p-1" type="text" placeholder="Ex: Lutfuus15684!"/>
        <div className="flex text-white">
          <input className= "" type="checkbox" />
          <p className="ml-1">Se souvenir de moi</p>
          <p className="ml-24">Mot de passe oublié</p>
        </div>
      </div>
      <div className="mt-40">
        <button className="min-w-96 bg-amber-500 hover:bg-amber-700 text-white text-2xl font-bold py-2 px-4 rounded">Connexion</button>
        <p className="text-white mt-2 text-">Pas encore inscrit ? Cliquez ici</p>
      </div>
    </div>
    </>
  )
}

