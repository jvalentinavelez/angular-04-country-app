import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})

//OnInit se ejecuta cuando el componente se inicializa, después dle constructor
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  //espera a que el usuario deje de escribir para lanzar la peticion
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    //this.debouncer.unsubscribe()
    this.debouncerSuscription?.unsubscribe();
  }

  //emisión se hace mediante el observable
  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  // @Output()
  // public onValue = new EventEmitter<string>();

  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }
}
