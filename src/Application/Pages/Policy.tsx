import { NavLink } from "react-router-dom"

export const Policy = () => {
  return(
    <>
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-1/3 p-7 text-2xl mb-5 font-medium bg-white rounded-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Politique de confidentialité</h1>
        <p>Nous attachons une grande importance à la protection de vos données personnelles. Voici comment nous les collectons et les utilisons :</p>
        <br />
        <p>Collecte des informations : Nous recueillons uniquement les informations nécessaires pour vous fournir nos services, comme votre nom, adresse e-mail, et toute autre donnée requise.</p>
        <br />
        <p>Utilisation des données : Vos informations sont utilisées uniquement pour vous fournir nos services, améliorer notre site, et répondre à vos demandes. Nous ne vendons ni ne partageons vos données avec des tiers, sauf si la loi l'exige.</p>
        <br />
        <p>Sécurité : Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre l'accès non autorisé, la modification ou la divulgation.</p>
        <br />
        <p>Modifications : Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.</p>
      </div>
      <NavLink to="/login" className="text-white text-2xl my-5 hover:underline">Revenir à la page de connexion</NavLink>
    </div>
    </>
  )
}