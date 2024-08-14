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
  categorie_id: string,
  _id: string,
  user_id: string
}

export type Question = {
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
}