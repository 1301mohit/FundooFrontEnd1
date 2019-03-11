import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
//import {MediaMatcher} from '@angular/cdk/layout';
//import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  titleName : string

  ngOnInit() {
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // addAccount(){
  //   this.router.navigate(['/register']);
  // }

  signOut(){
    this.router.navigate(['/login']);
  }

  Note(){
  this.titleName = "Note"
  }

  Remainder(){
    this.titleName = "Reminder"
  }

  editLabels(){
    this.titleName = "EditLable"
  }

  archive(){
    this.titleName = "Archive"
  }

  trash(){
    this.titleName = "Trash"
  }

}


