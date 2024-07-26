import React, { useEffect, useState } from "react";
import { quizService } from "../../Module/Quiz/quizService";

type AnswerProps = {
  text: string;
  index: number;
};

export const Answer: React.FC<AnswerProps> = ({ text, index }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const subscription = quizService.selectedAnswer$.subscribe(
      (selectedIndex) => {
        setIsSelected(selectedIndex === index);
      }
    );
    return () => subscription.unsubscribe();
  }, [index]);

  return (
    <div className="flex items-center p-4 mb-2 border rounded-2xl cursor-pointer hover:bg-gray-100">
      <input
        type="radio"
        name="answer"
        checked={isSelected}
        onChange={() => quizService.selectAnswer(index)}
        className="mr-2"
      />
      <label onClick={() => quizService.selectAnswer(index)}>{text}</label>
    </div>
  );
};
