import React, { useState } from 'react';
import { Answer } from './Answer';
import { quizService } from '../../Module/Quiz/quizService';

export const Question: React.FC = () => {
    const question = 'Quelle est la capitale de la France ?';
    const answers = ['Paris', 'Londres', 'Berlin', 'Madrid'];
    const correctAnswerIndex = 0; // Index de la bonne réponse
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleValidate = () => {
        const result = quizService.validateAnswer(correctAnswerIndex);
        setIsCorrect(result);
    };

    return (
        <div className="mb-6 w-2/3 flex flex-col">
            <h3 className="text-xl font-semibold mb-14 text-center">{question}</h3>
            {answers.map((answer, index) => (
                <Answer key={index} text={answer} index={index} />
            ))}
            <div className='flex flex-col items-center'>
              <button
                  onClick={handleValidate}
                  className="mt-4 p-2 w-2/3 text-xl bg-sky-600 text-white rounded-full hover:bg-blue-700"
                  >
                  Valider
              </button>
              {isCorrect !== null && (
                <div className={`w-1/2 mt-4 p-2 text-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full`}>
                      {isCorrect ? 'Correct!' : 'Incorrect!'}
                  </div>
              )}
            </div>
        </div>
    );
};
