import { Quiz } from "../Composants/Quiz"
import { NavLink } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { QuizBg } from "../Composants/QuizBg";

export const QuizDisplay = () => {
  return (
    <div className="relative quizstyle flex flex-col justify-center gap-20">
      <div className="ml-32">
        <NavLink to="/modechoice" className="text-white flex items-center text-xl hover:underline w-10">
          <GoChevronLeft />
          Retour
        </NavLink>
        <QuizBg />
      </div>
      <div className="flex justify-center items-center mx-96 p-24 rounded-2xl bg-white shadow-lg">
        <Quiz />
      </div>
    </div>
  )
}