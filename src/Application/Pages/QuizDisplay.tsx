import { Quiz } from "../Composants/Quiz"
import { NavLink } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";


export const QuizDisplay = () => {
  return (
    <div className="flex flex-col justify-center gap-24">
        <div className="ml-32 mt-14">
          <NavLink to="/themechoice" className="text-white flex items-center text-xl hover:underline"><GoChevronLeft />Retour</NavLink>
        </div>
        <div className="flex justify-center items-center mx-96 p-24 rounded-2xl bg-white">
          <Quiz />
        </div>
      </div>
  )
}