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
    <div className="flex items-center justify-between p-4 mb-4 border rounded-full cursor-pointer hover:bg-gray-100">
      <label className="ml-2" onClick={() => quizService.selectAnswer(index)}>{text}</label>
      <input
        type="radio"
        name="answer"
        checked={isSelected}
        onChange={() => quizService.selectAnswer(index)}
        className="mr-4"
      />
    </div>
  );
};
