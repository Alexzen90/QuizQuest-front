import { NavLink } from "react-router-dom";

export const ModeChoice = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl text-center text-white mt-20">Choisissez un mode</h1>
      <button className="mt-20 bg-white rounded-full font-semibold py-2 px-4 w-1/3 h-14 text-2xl">Classic</button>
      <button className="mt-16 bg-white rounded-full font-semibold py-2 px-4 w-1/3 h-14 text-2xl">Aléatoire</button>
      <NavLink to="/login" className="mt-28 text-white text-2xl hover:underline">Revenir à la page de connexion</NavLink>
    </div>
  );
};