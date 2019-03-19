import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar,
              private dialog: MatDialog) { }
              
//@Input() cardsArray=[];
//@Input() card;
  color : String;
  card=[];


  // title: String
  // description: String
  // isPin: boolean
  // color1: String
  // isArchive: boolean
  // isTrash: boolean


  // flag1 = true;
  ngOnInit() {
    this.getAllCard();
  }

  getAllCard(){
    this.httpService.getRequestForNote('/getAllNotes').subscribe(data=>{
      console.log('data is in note',data);
      this.card=data;
    },err=>{
      console.log(err);
    })
  }

  changeOfColor($event){
    this.color = $event;
    console.log('event for color change ',$event);
    
    this.getAllCard();
  }

  openDialog(items){
    console.log(items);
    
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        title: items.title,
        description: items.description,
        isPin: items.pinned,
        color1: items.color,
        isArchive: items.archive,
        isTrash: items.trash,
        noteId:items.noteId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllCard();
    });
  }

  // :host/ deep/ {

  // }

  // pinned(card){
  //   console.log("pin:",card.isPinned);
  //   this.httpService.putRequestForNote('/pinNote/'+card.noteId,'').subscribe(data => {
  //     console.log("pin note card");
  //     this.snackbar.open(data.statusMessage, "Pinned", { duration : 5000 });
  //   })
    // this.flag1 = !this.flag1;
  // }
  update(event){
    this.getAllCard();
  }
}
