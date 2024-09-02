import { NavLink } from "react-router-dom";
import { Quizrandom } from "../Composants/Quizrandom";
import { GoChevronLeft } from "react-icons/go";
import { QuizBg } from "../Composants/QuizBg";

export const QuizrandomDisplay = () => {
  return (
    
    <div className="relative flex flex-col justify-center gap-20">
     
      <div className="ml-32">
        <NavLink to="/modechoice" className="text-white flex mt-20 items-center text-xl hover:underline">
          <GoChevronLeft />
          Retour
        </NavLink>
        <QuizBg />
      </div>
      
      <div className="flex justify-center items-center mx-96 p-24 rounded-2xl bg-white shadow-lg">
        <Quizrandom />
      </div>
      
    </div>
  );
};