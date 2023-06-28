import {
  Component,
  Input,
  Output,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { merge, Observable, startWith, map, filter, flatMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-autocomplete',
  template: `
              <div #temp style="width: 230px">
                <input id="myInput"
                       [formControl]="control"
                       [placeholder] = "placeholder">
                <ng-container *ngIf="onFocus">
                  <div *ngFor="let data of filteredData | async">
                   <button style="width: 100%; background-color: transparent;" (click)="optionSelected(data.id)" [innerHTML]="data.name | bold: control.value"></button>
                  </div>
                </ng-container>
              </div>
              `,
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appAutocomplete'
})
export class AutocompleteComponent implements OnInit{
 @ViewChild('temp') template?: ElementRef;
 control = new FormControl();
 @Input() placeholder?: string;
 @Input() listData?: Observable<any[]>;

 @Output() selectedOptionEvent = new EventEmitter<string>();

 filteredData?: Observable<any[]>;
 onFocus?: boolean;

 @HostListener("document:click", ['$event'])
   clickedOut(event: MouseEvent): void {
    if (this.template!.nativeElement.contains(event.target) === false) {
     //this.control.setValue("")
     this.onFocus = false
    }else{
     this.onFocus = true
      this.selectedOptionEvent.emit("");
    }

   }

 ngOnInit() {
  this.control.valueChanges.subscribe(x => {
     this.filteredData =  this.listData!.pipe(
       map(items => items.filter(item => item.name.toLowerCase().indexOf(x.toLowerCase()) > -1))
     )
   })
  }

  optionSelected(id: string){
    this.listData?.subscribe( res => {
         let value =  res.find(x => x.id === Number(id)).name
         this.control.setValue(value)
         this.selectedOptionEvent.emit(id);
       }
      )
  }

}
