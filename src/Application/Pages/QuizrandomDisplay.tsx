import { NavLink } from "react-router-dom";
import { Quizrandom } from "../Composants/Quizrandom";
import { GoChevronLeft } from "react-icons/go";

export const QuizrandomDisplay = () => {
  return (   
      <div className="flex flex-col justify-center gap-32">
        <div className="ml-32 mt-14">
          <NavLink to="/modechoice" className="text-white flex items-center text-xl hover:underline"><GoChevronLeft />Retour</NavLink>
        </div>
        <div className="flex justify-center items-center mx-96 p-24 rounded-2xl bg-white">
          <Quizrandom />
        </div>
      </div>
  );
};
