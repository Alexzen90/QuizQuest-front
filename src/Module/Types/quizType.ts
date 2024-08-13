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
  questions: QuestionData[]
}

export type Question = {
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
}