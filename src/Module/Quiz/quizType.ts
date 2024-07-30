export type QuestionData = {
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type Difficulty = 'facile' | 'moyen' | 'difficile'