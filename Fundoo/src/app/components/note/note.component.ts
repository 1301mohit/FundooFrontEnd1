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
  even='';
  card=[];
  pin = [];
  unpin = [];
  
  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) { 
                 console.log("Note Component in constr");
              this.getAllCard();
              console.log("Card in note Component",this.card);}


  ngOnInit() {
     console.log("Note Component in ng on in it");
     this.getAllCard();
     console.log("Card in note Component",this.card);
  }
//card=[];
update(value){
  this.even=value;
}

getAllCard() {
  console.log("GetAllCard in note");
  this.httpService.getRequestForNote('/getAllListOfNotes?isArchive='+false+'&isTrash='+false).subscribe(data => {
    console.log('Data in note', data);
    this.card = data;
    console.log("Card in note---->",this.card);
    var i : Number;
  }, err => {
    console.log(err);
  })
}

// getAllCard(){
//   this.httpService.getRequestForNote('/getAllNotes').subscribe(data=>{
//     console.log('data is in note',data);
//     this.card=data;
//   },err=>{
//     console.log(err);
//   })
// }

//   getAllCard(){
//     this.httpService.getRequestForNote('/getAllNotes',"").subscribe(data=>
//       console.log("data",data);
//   },
//   err => {
//     this.snackbar.open('Login unSuccessful', 'End Now', {duration:3000});
//   }); 
// }
}
