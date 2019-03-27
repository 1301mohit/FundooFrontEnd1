import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewchangeService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage() {
    this.currentMessage.subscribe( response => {
      this.messageSource.next(!response);
    }
    )
  }
}
