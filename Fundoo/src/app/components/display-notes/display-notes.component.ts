import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ViewchangeService } from 'src/app/services/viewchange.service';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar,
              private dialog: MatDialog,
              private viewChange : ViewchangeService) { }
              
//@Input() cardsArray=[];
//@Input() card;
  @Input() pin:[];
  @Input() unpin:[];
  color1 : String;
  card:[];
  labelOfNote:[];
  private subscribeView : boolean;

  token : any = localStorage.getItem('token');

  //collaborators : [];


  // title: String
  // description: String
  // isPin: boolean
  // color1: String
  // isArchive: boolean
  // isTrash: boolean


  //flag1 = true;
  ngOnInit() {
    console.log("Display-Notes");
    this.getAllCard();
   // console.log("Pinned note:",this.pin);
    console.log("Unpinned note:",this.unpin);
   // this.getLabelOfNote();
    this.viewChange.subscribeView.subscribe(view => {
      this.subscribeView = view;
    })
    console.log("Card--------------------->",this.card);
    //this.collaborators = this.card.collaboratedUser;
  }
@Input()
public set childMessage(v : string) {
console.log(v);
this.getAllCard();

}

  // getAllCard(){
  //   this.httpService.getRequestForNote('/getAllNotes').subscribe(data=>{
  //     console.log('get all cards');
  //     console.log('data is in note',data);
  //     this.card=data;
  //   },err=>{
  //     console.log(err);
  //   })
  // }


  getAllCard() {
    this.httpService.getRequestForNote('/getAllListOfNotes?isArchive='+false+'&isTrash='+false).subscribe(data => {
      console.log('data is in note', data);
      this.card = data;
      console.log("Card---->",this.card);
      // var i : Number;
      // for(i=0; i<this.card.length; i++){
      //   this.pin.push(this.card[i]);
     // }
    }, err => {
      console.log(err);
    })
  }

  changeOfColor($event){
    this.color1 = $event;
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
        pinned: items.pinned,
        color: items.color,
        archive: items.archive,
        trash: items.trash,
        noteId:items.noteId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllCard();
    });
  }

  openDialog1(card1): void{
    console.log("Open Collaborator");
    console.log("Collaborator dialog component card --->",card1);
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '600px',
      height: '400px',
      data: card1
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log('Data--->',result);
  });
}
  // :host/ deep/ {

  // }

  pinned(card){
    console.log("pin:",card.pinned);
    console.log("Note ID:",card.noteId);
    this.httpService.putRequestForNote('/pinNote/'+card.noteId).subscribe(data => {
      console.log("pin note card");
     // this.flag1 = !this.flag1;
      this.snackbar.open(data.statusMessage, "Pinned", { duration : 5000 });
      this.getAllCard();
    },err => {
      this.snackbar.open(err);
    }) 
  }

  update(event){
    console.log('event in display');
    
    this.getAllCard();
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  

  remove(label,noteId){
    console.log("Label"+label);
    console.log("Note"+noteId);
    // const index = this.labelOfNote.indexOf(label);
    this.httpService.deleteRequestForNote('/deleteLabelOfNote/'+label.labelId+'/'+noteId).subscribe( data => {
      console.log("Delete label from note response"+data);
      this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
      this.getAllCard();
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration:3000 })
    })
  }

  removeRemainder(card): void {
    this.httpService.deleteRequestForNote('/deleteRemainder/'+card.noteId).subscribe( data => {
      console.log("Remove remainder from note");
      this.snackbar.open(data.statusMessage, "End-Now", { duration : 3000 });
      this.getAllCard();
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration:3000 });
    }
      )
  }




 
}














 // getLabelOfNote(card){
  //   console.log("note id ", card.noteId)
  //   this.httpService.getRequestForNote('/getLabelOfNote/'+card.noteId).subscribe( data => {
  //     console.log("getLabelOfNote responce  data"+data)
  //     this.labelOfNote = data;
  //     console.log("getLabelOfNote data"+ this.labelOfNote)
  //   },
  //   error => {
  //     this.snackbar.open(error, "End-Now", { duration:3000 })
  //   }
  //   )
  // }