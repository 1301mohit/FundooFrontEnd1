import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import { FormControl } from '@angular/forms';

export interface DialogData {
  title: String,
  description: String,
  isPin: boolean,
  color1: String,
  isArchive: boolean,
  isTrash: boolean
}

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit{

  model : any;
  title : any = "";
  description : any = "";
  color : any=" white";


  id: any;
  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<EditNoteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
                this.title = new FormControl(data.title);
                this.description = new FormControl(data.description);
                this.color = data.color1;
                console.log(data);
                
             }

  

  //@Input() cardsArray=[];
  //@Input() card;
  // color: String;
  // card = [];
  // flag1 = true;
  ngOnInit() {
    // console.log("Title:",this.title);
    
  }

  
 
  save(){
    console.log(this.data);
    
    this.data.title = this.title.value;
    this.data.description = this.description.value;
    console.log("Title",this.title.value);
    console.log("Color",this.data.color);
    let object = {
      "title": this.title.value,
      "description": this.description.value,
      "isPinned": this.data.isPin,
      "color": this.color,
      "isArchive": this.data.isArchive,
      "isTrash": this.data.isTrash
    }
    console.log("update model",object);
    this.httpService.updateRequestForNote('/updateNote/'+this.data.noteId, object).subscribe(data => {
      console.log("updateNotes data", data);
      this.snackbar.open(data.statusMessage, 'End now', { duration: 5000 });
    },
    err => {
      this.snackbar.open(err, 'End now', { duration: 5000 });
      console.log("error-------", err);
    })
    this.dialogRef.close({ data : this.data });
  }

  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

  // getAllCard() {
  //   this.httpService.getRequestForNote('/getAllNotes').subscribe(data => {
  //     console.log('data is in note', data);
  //     this.card = data;
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  changeOfColor(event) {
    console.log(event);
    
    this.color = event;
  }

}
