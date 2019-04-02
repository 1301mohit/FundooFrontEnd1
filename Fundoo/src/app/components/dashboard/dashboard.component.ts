import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT} from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { AUTO_STYLE } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';
import { ViewchangeService } from 'src/app/services/viewchange.service';
import { ProfilepicComponent } from '../profilepic/profilepic.component';
//import {MediaMatcher} from '@angular/cdk/layout';
//import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  token : string = localStorage.getItem('token');
  titleName : string
  label : [];
  isClicked = true;
  card1 : [];
  fName : string;
  
  email = localStorage.getItem('email');
  ngOnInit() {
    this.getAllLabel();
    console.log("Email in dashboard",this.email)
    console.log("Token:",this.token);
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(private httpService: HttpService,
              changeDetectorRef: ChangeDetectorRef, 
              private snackbar: MatSnackBar,
              media: MediaMatcher, 
              private router: Router,
              public dialog: MatDialog,
              private viewChange: ViewchangeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  signOut(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  Note(){
    this.titleName = "Note"
    this.router.navigateByUrl('/dashboard/note')
  }

  Remainder(){
    this.titleName = "Reminder"
  }

  editLabels(){
    this.titleName = "EditLable"
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.router.navigate(['/dashboard/note']);
      this.getAllLabel();
    });
  }

  archive(){
    this.titleName = "Archive"
    this.router.navigateByUrl('/dashboard/display-archive')
    //this.httpService.postRequestForNote('/archiveNote/'+)
  }

  trash(){
    this.titleName = "Trash"
    this.router.navigateByUrl('/dashboard/display-trash')
  }

  getAllLabel(){
    console.log("get All Labels");
    this.httpService.getRequestForNote('/getAllLabels').subscribe(data => {
      this.label = data;
    }, err => {
      this.snackbar.open(err, "End-Now", { duration : 3000 });
    }
    )
  }

  grid(){
    this.isClicked = !this.isClicked;
    console.log(this.isClicked);
  }

  change(){
    this.viewChange.onViewChange(this.isClicked);
  }

  labelNote(labelId){
    //var labelId = localStorage.getItem('labelId');
    localStorage.setItem('labelId', labelId);
    let labelId1 = localStorage.getItem('labelId');
    console.log("Labelid",labelId);
    console.log("Labelid",labelId1);
    // this.httpService.getRequestForNote('/getNoteOfLabel/'+labelId).subscribe( data => {
    //   console.log("Card",data);
    //   this.card1 = data;
    //   console.log("Card",this.card1);
    // },error=>
    // {
    //   this.snackbar.open("Error in getNoteOfLabel", "End-Now", { duration : 3000 });
    // }
    //   )
    this.router.navigate(['/dashboard/edit-label-note']);
  }

  ProfileSelect(){
    const dialogRef = this.dialog.open(ProfilepicComponent, {
      width: '900px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((image:any) => {
      console.log('The dialog was closed');
      console.log('Image',image);
      console.log('Image file',typeof image);
      
      this.httpService.uploadProfilePic("/imageUpload/",image).subscribe( response => {
        console.log(response);
        
        this.snackbar.open(response.statusMessage, 'Success', { duration:3000 });
      },error => {
          this.snackbar.open(error, 'fail', { duration:3000 });
      });
    })
  }
  

  // getMoreInformation(): string {
  //   return "Fundoo Account \n"+
  // }
  // change(){
  //   this.viewChange.onViewChange();
  // }
}


