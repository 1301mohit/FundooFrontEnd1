import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-display-archive',
  templateUrl: './display-archive.component.html',
  styleUrls: ['./display-archive.component.scss']
})
export class DisplayArchiveComponent implements OnInit {

  color : String;
  card=[];

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) { }

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
}
