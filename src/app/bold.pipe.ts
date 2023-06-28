import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {

  transform(value: string, search: string): any {
      let index = value.toUpperCase().indexOf(search.toUpperCase())
      return value.substring(0,index)
                      + '<strong>' +  value.substring(index,index + search.length) + '</strong>'
                      + value.substring(index + search.length)

  }

}
