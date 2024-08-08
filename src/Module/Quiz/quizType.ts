export type QuestionData = {
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type QuizCreation = {
  name: string
  categorie: string
  questions: QuestionData[]
}

export type QuizInfos = {
  name: string,
  categorie: string,
  _id: string
}

export type QuizFull = {
  _id: string,
  name: string,
  categorie: string,
  questions1: QuestionData[],
  questions2: QuestionData[],
  questions3: QuestionData[],
  questions4: QuestionData[],
  questions5: QuestionData[],
  questions6: QuestionData[],
  questions7: QuestionData[],
  questions8: QuestionData[],
  questions9: QuestionData[],
  questions10: QuestionData[]
}