export type QuestionData = {
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type Quiz = {
  name: string
  category: string
  questions: QuestionData[]
}