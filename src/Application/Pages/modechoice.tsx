import { NavLink } from "react-router-dom";
import { Navigation } from "../Composants/Navigation";

export const ModeChoice = () => {
  return (
    <div className="h-[calc(100vh-230px)] flex flex-col items-center justify-center pt-20">
      <h1 className="text-3xl text-center text-white font-bold mt-10">Choisissez un mode</h1>
      <button className="mt-20 bg-white rounded-full font-semibold py-2 px-4 w-1/3 h-14 text-2xl hover:underline"><NavLink to="/themechoice">Classique</NavLink></button>
      <button className="mt-16 bg-white rounded-full font-semibold py-2 px-4 w-1/3 h-14 text-2xl hover:underline"><NavLink to="/infoaleatoire">Aléatoire</NavLink></button>
      <div className="mt-10">
        <Navigation /> 
      </div>
    </div>
  );
};