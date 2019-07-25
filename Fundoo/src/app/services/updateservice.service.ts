import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateserviceService {


  private data = new BehaviorSubject([]);
  currentDate = this.data.asObservable();
  // private messageSource = new BehaviorSubject('default message');
  // currentMessage = this.messageSource.asObservable();  
  
  archive : boolean = false;
  trash : boolean = false;
  
  constructor(private httpService:HttpService) { }

  updateMessage() {
    this.httpService.getRequestForNote('/getAllListOfNotes?isArchive='+false+'&isTrash='+false).subscribe(response => {
      this.data.next(response);
    }, err => {
      console.log(err);
    })
  }

}
