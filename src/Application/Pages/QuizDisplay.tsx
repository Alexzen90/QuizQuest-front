import { Quiz } from "../Composants/Quiz"
import { NavLink } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { QuizBg } from "../Composants/QuizBg";

export const QuizDisplay = () => {
  return (
    <div className="h-screen relative quizstyle pt-10 justify-center ">
      <div className="ml-10 mb-[-20px]">
        <NavLink to="/themechoice" className="text-white flex items-center text-xl hover:underline">
          <GoChevronLeft className=""/>
          Retour
        </NavLink>
        <QuizBg />
      </div>
      <div className="h-[calc(100vh-230px)] flex justify-center items-center mx-96 mt-16 p-24 rounded-2xl shadow-lg">
        <Quiz />
      </div>
    </div>
  )
}