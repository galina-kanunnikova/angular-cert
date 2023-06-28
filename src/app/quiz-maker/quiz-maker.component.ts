import {Component} from '@angular/core';
import {Category, Difficulty, Question} from '../data.models';
import {Observable, map} from 'rxjs';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {

  categorySelected: any;
  subcategorySelected: any;
  categorySelectedName: any;

  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;

  constructor(protected quizService: QuizService) {
    this.categories$ = this.quizService.getAllCategories()
    //console.log(quizService.getAllCategories())
  }

  checkCategory(catId: string): void {
    this.categories$.subscribe(res => {
       let selectedcat = res.find(cat => cat.id === Number(catId))
       this.categorySelectedName = selectedcat?.name.split(":")[0].toLowerCase()
       });
    }

  categoryOptionSelected(id: string): void {
      console.log("categoryOptionSelected " + id)
      this.categorySelected = id;
      this.checkCategory(id)
      this.subcategorySelected = null
  }

  subcategoryOptionSelected(id: string): void {
        this.subcategorySelected = id;
        this.categorySelected = null
    }

  createQuiz(difficulty: string): void {
   var id = "0"
   if (this.subcategorySelected) {id = this.subcategorySelected}
   else{
   id = this.categorySelected
   }
   this.quizService.difficultySelected = difficulty
   this.quizService.categorySelected = id
   this.questions$ = this.quizService.createQuiz(id, difficulty as Difficulty);
  }

}
