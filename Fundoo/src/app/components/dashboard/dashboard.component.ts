import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT} from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { AUTO_STYLE } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';
//import {MediaMatcher} from '@angular/cdk/layout';
//import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  titleName : string
  label : [];
  isClicked = false;

  ngOnInit() {
    this.getAllLabel();
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(private httpService: HttpService,
              changeDetectorRef: ChangeDetectorRef, 
              private snackbar: MatSnackBar,
              media: MediaMatcher, 
              private router: Router,
              public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  signOut(){
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
  }

  change(){
    
  }
}


