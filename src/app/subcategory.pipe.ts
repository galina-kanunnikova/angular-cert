import { Pipe, PipeTransform } from '@angular/core';
import {map,filter, Observable} from 'rxjs';
import {Category} from './data.models';
import {QuizService} from './quiz.service';

@Pipe({
  name: 'subcategory'
})
export class SubcategoryPipe implements PipeTransform {

  transform(allCategories: Observable<Category[]>, forName: string) {
          return allCategories.pipe(
          map(res => {
            const newArray: Category[] = res
                 .filter(items => {
                 return items.name.split(":")[0].toLowerCase() == forName} )
                 .map(q => ( {id: q.id, name: q.name.split(":")[1]} ) );
            return newArray

            })
    )}

}
