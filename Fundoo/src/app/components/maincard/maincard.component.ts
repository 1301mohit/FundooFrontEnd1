import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-maincard',
  templateUrl: './maincard.component.html',
  styleUrls: ['./maincard.component.scss']
})

export class MaincardComponent implements OnInit {
  flag = true;
  flag1 = false;
  // noteTitle = new FormControl('', Validators.required);
  // noteContent = new FormControl('', Validators.required);
  noteTitle = new FormControl('');
  noteContent = new FormControl('');
  model: any;
  response: any;
  color = "#fafafa";
  

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar: MatSnackBar) { }


              
  ngOnInit() {
    
  }



  pinned() {
    console.log(this.flag1);
    this.flag1 = !this.flag1;
    console.log(this.flag1);
  }
  // @Output() messageEvent = new EventEmitter<string>();


  addNote() {

    this.flag = !this.flag;
    //  this.noteTitle=document.getElementById('noteTitle').innerHTML;
    //  this.noteContent = document.getElementById('noteContent').innerHTML;
    console.log(this.noteTitle.value);


    if (this.noteTitle.value != '' || this.noteContent.value != '') {
      this.model = {
        "title": this.noteTitle.value,
        "description": this.noteContent.value,
        "pinned": this.flag1,
        "color": this.color,
        "archive": false
      }
      //console.log("Type of title"+typeof this.noteTitle.value);
      console.log("model data in addNote method", this.model);
      this.httpService.postRequestForNote('/addNote', this.model).subscribe(data => {
        console.log("addNotes data", data);
        this.snackbar.open(data.statusMessage, 'End now', { duration: 5000 });
      //this.messageEvent.emit(this.model);
      },
      err => {
        this.snackbar.open(err, 'End now', { duration: 5000 });
        console.log("error-------", err);
      })
    }
    else{
      this.snackbar.open("Note is empty", 'End now', { duration: 3000});
    }
  }

  Changes($event){ 
     this.color=$event;
     console.log("im reached in main card",this.color);
   }

 

  reverseFlag($event) {
    this.flag = !this.flag;
  }

}
