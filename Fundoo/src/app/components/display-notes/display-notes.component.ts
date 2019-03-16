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
  }

  getNoteId(items){
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '30%',
     // data: {name: this.name, animal: this.animal}
    });
  }

  // pinned(card){
  //   console.log("pin:",card.isPinned);
  //   this.httpService.putRequestForNote('/pinNote/'+card.noteId,'').subscribe(data => {
  //     console.log("pin note card");
  //     this.snackbar.open(data.statusMessage, "Pinned", { duration : 5000 });
  //   })
    // this.flag1 = !this.flag1;
  // }
}
