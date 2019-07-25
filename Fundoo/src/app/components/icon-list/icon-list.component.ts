import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatCard } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { log } from 'util';
import { Title } from '@angular/platform-browser';
import { setDefaultService } from 'selenium-webdriver/edge';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT} from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { EditLabelNoteComponent } from 'src/app/edit-label-note/edit-label-note.component';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  // @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Output() colorchange = new EventEmitter();
  @Input() card;
  @Input() title;
  @Input() description;

  label : [];
  dateNow : Date = new Date();
  dateInIso : any;
 // archive:boolean=false; 
  constructor(private httpService: HttpService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) {
      // if(this.card!=null){
      // this.archive =this.card.archive; 
       console.log("Card in Constructor",this.card)
      // else{
      //   console.log(this.archive)
      // }
     }

  ngOnInit() {
   
  }

  colorArray = [[{ 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E53935', 'name': 'Red' },
  { 'color': '#EF6C00', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [{ 'color': '#B2FF59', 'name': 'green' },
  { 'color': '#69F0AE', 'name': 'teal' },
  { 'color': '#81D4FA', 'name': 'blue' },
  { 'color': '#0288D1', 'name': 'darkblue' }],

  [{ 'color': '#B39DDB', 'name': 'purple' },
  { 'color': '#F48FB1', 'name': 'pink' },
  { 'color': '#FFAB40', 'name': 'brown' },
  { 'color': '#E0E0E0', 'name': 'gray' }]]
  

  colorsEdit(colorId) {
    this.colorchange.emit(colorId);
    console.log(colorId);
    
    if (this.card != undefined && this.card.noteId != undefined) {
      console.log("card id is ",this.card.noteId);
      console.log("card data at icon", this.card);
      console.log("card color set", typeof colorId);
      var newStr = colorId.replace(/#/g, "%23");
      console.log('color is ',newStr);


      this.httpService.postRequestForNote('/color/'+this.card.noteId+'?color='+newStr,"").subscribe(data => {
        // this.httpService.postRequestForNote('/color/'+this.card.noteId+'/'+colorId,"").subscribe(data => {
        this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
        console.log("ColorId",colorId);
        this.updateEvent.emit({});
      })
    }
  }

  delete() {
    console.log("Delete note");
    console.log("CardId", this.card.noteId);
    this.httpService.deleteRequestForNote('/deleteNote/'+this.card.noteId).subscribe(data => {
      this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
      this.updateEvent.emit({});
     // this.updateEvent.emit({type:'trash'});
    },
      error => {
        this.snackbar.open(error, 'End Now', { duration: 3000 });
      });
  }

  archiveNote(){
    console.log("Archive note");
    console.log("Archive Note:"+this.card);

    if(this.card.archive != undefined){
      this.httpService.putRequestForNote('/archiveNote/'+this.card.noteId).subscribe(data => {
        this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
        this.updateEvent.emit({});
        //this.updateEvent.emit({type:'archive'});
      },
      error =>{
        this.snackbar.open(error, 'End Now', { duration: 3000 });
      }
      )
    }
  }

  // setRemainder(){
  //   console.log("Remainder Note");
  //   this.httpService.postRequestForNote
  // }
  // label(){
  //   console.log("Label Note");
  //   const dialogRef = this.dialog.open(EditLabelNoteComponent, {
  //     data: {}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     //this.router.navigate(['/dashboard/note']);
  //     this.getAllLabel();
  //   });
  // }

  getAllLabel(){
    console.log("get All Labels");
    this.httpService.getRequestForNote('/getAllLabels').subscribe(data => {
      this.label = data;
    }, err => {
      this.snackbar.open(err, "End-Now", { duration : 3000 });
    }
    )
  }

  // getAllCard() {
  //   this.httpService.getRequestForNote('/getAllNotes').subscribe(data => {
  //     console.log('data is in note', data);
  //     this.card = data;
  //   }, err => {
  //     console.log(err);
  //   })
  // }

  // getAllCard() {
  //   this.httpService.getRequestForNote('/getAllListOfNotes?isArchive='+false+'&isTrash='+false).subscribe(data => {
  //     console.log('data is in note', data);
  //     this.card = data;
  //   }, err => {
  //     console.log(err);
  //   })
  // }


  addLabelToNote(index){
    console.log("Add label to note");
    this.httpService.postRequestForNote('/addLabelInNote/'+index.labelId+'/'+this.card.noteId,"").subscribe(data => {
      this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
      // this.updateEvent.emit({});
    },
    error =>{
      this.snackbar.open(error, 'End Now', { duration : 3000 });
    }
    )
  }

  setRemainderForNextWeek(){
    this.dateNow.setDate(this.dateNow.getDate() + 7);
    console.log("Set remainder for today date");
    console.log("Date:",this.dateNow);
    this.dateInIso = this.dateNow.toISOString();
    console.log("Date in ISO:",this.dateInIso);
    this.httpService.postRequestForNote('/addRemainder/'+this.card.noteId+'?date='+this.dateInIso,"").subscribe(data => {
      this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
      this.updateEvent.emit({});
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration : 3000 });
    })
  }

  setRemainderForTommorow(){
    this.dateNow.setDate(this.dateNow.getDate() + 1);
    console.log("Set remainder for today date");
    console.log("Date:",this.dateNow);
    this.dateInIso = this.dateNow.toISOString();
    console.log("Date in ISO:",this.dateInIso);
    this.httpService.postRequestForNote('/addRemainder/'+this.card.noteId+'?date='+this.dateInIso,"").subscribe(data => {
      this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
      this.updateEvent.emit({});
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration : 3000 });
    })
  }

  setRemainderForToday(){
    console.log("Set remainder for today date");
    console.log("Date:",this.dateNow);
    this.dateInIso = this.dateNow.toISOString();
    console.log("Date in ISO:",this.dateInIso);
    this.httpService.postRequestForNote('/addRemainder/'+this.card.noteId+'?date='+this.dateInIso,"").subscribe(data => {
      this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
      this.updateEvent.emit({});
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration : 3000 });
    })
  }

  setReminder(){
    console.log("Set remainder in note");
    console.log("Date:",this.dateNow);
    console.log("Card:",this.card.noteId);
    this.dateInIso = this.dateNow.toISOString();
    console.log("Date in ISO:",this.dateInIso);
    this.httpService.postRequestForNote('/addRemainder/'+this.card.noteId+'?date='+this.dateInIso,"").subscribe(data => {
      this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
      this.updateEvent.emit({});
    },
    error => {
      this.snackbar.open(error, "End-Now", { duration : 3000 });
    })
  }

  openDialog(): void{
    console.log("Open Collaborator");
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '600px',
      height: '400px',
      data: this.card
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log('Data--->',result);
    console.log("Collaborator dialog box");
    this.updateEvent.emit({});
   // this.getAllCard();
  });
  }

  // restore(noteId) {
  //   console.log("Restore note");
  //   this.httpService.postRequestForNote('/restoreNote/'+noteId,"").subscribe(data => {
  //     this.snackbar.open(data.statusMessage, "End-Now", { duration:3000 });
  //    // this.getAllCard();
  //    // this.updateEvent.emit({type:'trash'});
  //   }),
  //   error => {
  //     this.snackbar.open(error, "End Now", { duration:3000 });
  //   }
  // }
}









//   colorsEdit(id, card) {
  //     if(card.noteId != undefined)

  //     {
  //     console.log('color is ',id);
  //     console.log("Card is",card.noteId);
  //     card.color = id;
  //     console.log("Color:",card.color);
  //     this.colorEmit.emit(id)

  //     console.log('color')
  //    //   this.card.type = 'color'

  // //        const reqData = {
  // //   "color": id,
  // //   "noteIdList": [card.id]
  // // }
  //     console.log("card:",card)
  //     this.httpService.postRequest('/color/card.id?color='+this.color.value,'').subscribe(data =>{
  //       this.snackbar.open(data.statusMessage,"End Now", {duration:3000});
  //       this.colorchange.emit(id);
  //   })
  //     }


  // this.noteService.postcolor({
  //   "color": id,
  // //  "noteIdList": [card.id]
  // }).subscribe(data => {
  //   console.log("color event reached ",data)
  //   // localStorage.setItem('colorId', this.color.id)
  //   this.colorchange.emit(id);
  // })

  // }
  //this.colorEmit.emit(colorId);


  // http://localhost:8080/color/44?color=%23sachin