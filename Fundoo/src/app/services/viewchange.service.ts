import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewchangeService {

  private currentView = new BehaviorSubject(false);
  subscribeView = this.currentView.asObservable();

  constructor() { }

  onViewChange(response : boolean){
    this.currentView.next(response);
  }

  // onViewChange() {
  //     this.subscribeView.subscribe( (response) => {
  //     this.currentView.next(!response);
  //   }
  //   )
  // }
}
