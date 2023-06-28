import { Pipe, PipeTransform } from '@angular/core';
import {map,filter, Observable} from 'rxjs';
import {Category} from './data.models';
import {QuizService} from './quiz.service';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  transform(allCategories: Observable<Category[]>) {
        return allCategories.pipe(
        map(res => {
         const newArray: Category[] = res.map(q => (
         {id: q.id, name: q.name.split(":")[0]}));
         return newArray.filter((category, index, array) =>
                             index === array.findIndex((findCategory) =>
                                findCategory.name === category.name
                             )
                          )
        })
  )}
}

