export type QuestionData = {
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type QuizCreation = {
  name: string
  categorie: string
  questions: QuestionData
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
  question1: QuestionData,
  question2: QuestionData,
  question3: QuestionData,
  question4: QuestionData,
  question5: QuestionData,
  question6: QuestionData,
  question7: QuestionData,
  question8: QuestionData,
  question9: QuestionData,
  question10: QuestionData
}