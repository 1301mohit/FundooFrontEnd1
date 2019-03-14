import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  
  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) {}

  
  ngOnInit() {
    this.getAllCard();
  }
card=[];


getAllCard(){
  this.httpService.getRequestForNote('/getAllNotes').subscribe(data=>{
    console.log('data is in note',data);
    this.card=data;
  },err=>{
    console.log(err);
  })
}

//   getAllCard(){
//     this.httpService.getRequestForNote('/getAllNotes',"").subscribe(data=>
//       console.log("data",data);
//   },
//   err => {
//     this.snackbar.open('Login unSuccessful', 'End Now', {duration:3000});
//   }); 
// }
}
