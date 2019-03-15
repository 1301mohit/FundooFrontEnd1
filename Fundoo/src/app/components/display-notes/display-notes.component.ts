import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) { }
              
//@Input() cardsArray=[];
//@Input() card;
  color : String;
  card=[];
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
