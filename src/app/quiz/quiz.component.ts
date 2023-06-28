import {Component, inject, Input, ElementRef} from '@angular/core';
import {Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import {first} from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input()
  questions: Question[] | null = [];

  hideButtons: boolean = false

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }
  removeButtons(id: number): void {
    this.quizService.createQuiz(this.quizService.categorySelected, this.quizService.difficultySelected).pipe(first())
    .subscribe(res =>
      {
        this.questions![id] = res[0]
      }
    );
    this.quizService.hideButtons = true
   }
}
