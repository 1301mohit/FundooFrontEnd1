import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private httpService : HttpService
  ) { }

  changeMessage(message : string){
    this.httpService.getRequestForNote("/getAllSearchNotes?query="+message).subscribe(data => {
      console.log("Type of data in search service:"+typeof data);
      console.log("Data in Search Api:"+data);
      this.messageSource.next(data);
    })
  }
}
