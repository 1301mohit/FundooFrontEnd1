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
  flag1 = true;
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
        "isPin": false,
        "color": "this.color",
        "isArchive": false,
        "isTrash": false
      }
      console.log("model data", this.model);
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

  pinned() {
    this.flag1 =! this.flag1;
  }

  reverseFlag($event) {
    this.flag = !this.flag;
  }

}
