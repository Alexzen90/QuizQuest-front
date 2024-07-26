import { BehaviorSubject } from "rxjs";

class QuizService {
  private selectedAnswerSubject = new BehaviorSubject<number | null>(null);
  selectedAnswer$ = this.selectedAnswerSubject.asObservable();

  selectAnswer(index: number) {
      this.selectedAnswerSubject.next(index);
  }

  validateAnswer(correctIndex: number) {
      const selectedAnswer = this.selectedAnswerSubject.getValue();
      return selectedAnswer === correctIndex;
  }
}

export const quizService = new QuizService()