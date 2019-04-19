import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../edit-note/edit-note.component';

// export interface DialogData {
//   card1 : any;
//   // animal: string;
//   // name: string;
// }



@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  constructor(
    private httpService : HttpService,
    private snackbar : MatSnackBar,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  email : string = localStorage.getItem('email');
  token = localStorage.getItem('token');
  //cards : [];
  collaborators : [];

  ngOnInit() {
    console.log("Collaborator");
    console.log("Data --->",this.data);
    this.collaborators = this.data.collaboratedUser;
    console.log("Collaborator ---->",this.collaborators);
    this.getAllCards();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getAllCards(){
    this.httpService.getRequestForNote('/getAllNotes').subscribe( response => {
      console.log("Get all notes");
      console.log("Response -->",response);
    },error => {
      this.snackbar.open(error,"Error", { duration:2000 });
    })
  }

  create(email1){
    console.log("Create collaborator");
    console.log("Email->>>",email1);
    this.httpService.postRequestForNote("/addCollaborator/"+this.data.noteId+"?email="+email1,"").subscribe( response => {
      console.log("Add collaborator to note");
      this.snackbar.open(response.statusMessage, "End-Now", { duration:2000 });
      this.getAllCards();
    },error => {
      this.snackbar.open(error, "Error", { duration:2000 });
    })
  }

  remove(email1){
    this.httpService.deleteRequestForNote("/removeCollaborator/"+this.data.noteId+"?email="+email1).subscribe( response => {
      console.log("Remove collaborator to note");
      this.snackbar.open(response.statusMessage, "End-Now", { duration:2000 });
      this.getAllCards();
    },error => {
      this.snackbar.open(error, "Error", { duration:2000 });
    })
  }

}
