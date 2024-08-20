import { Quizrandom } from "../Composants/Quizrandom"

export const QuizrandomDisplay = () => {

  return (
    <div className="w-full h-full min-h-screen pt-44 bg-zinc-200">
      <div className="flex justify-center items-center mx-96 p-24 mb-20 rounded-2xl bg-white">
        <Quizrandom />
      </div>
    </div>
  )
}