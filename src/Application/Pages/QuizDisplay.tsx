import { Quiz } from "../Composants/Quiz"

export const QuizDisplay = () => {

  return (
    <div className="w-full h-screen pt-44 bg-zinc-200">
      <div className="flex justify-center items-center mx-96 p-24 mb-20 rounded-2xl bg-white">
        <Quiz />
      </div>
    </div>
  )
}