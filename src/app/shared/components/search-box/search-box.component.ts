import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})

//OnInit se ejecuta cuando el componente se inicializa, después dle constructor
export class SearchBoxComponent implements OnInit {
  private debouncer = new Subject<string>();

  @Input()
  public placeholder: string = '';

  // @Output()
  // public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  //espera a que el usuario deje de escribir para lanzar la peticion
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }

  //emisión se hace mediante el observable
  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
