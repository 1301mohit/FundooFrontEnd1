import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpService } from '../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-label-note',
  templateUrl: './edit-label-note.component.html',
  styleUrls: ['./edit-label-note.component.scss']
})
export class EditLabelNoteComponent implements OnInit {

  constructor(private httpService: HttpService,
              private router : Router,private route:ActivatedRoute,
              private snackbar : MatSnackBar) { }
  ngOnInit() {
this.route.params.subscribe(data=>{
  this.getNoteOfLabel(data.labelId);
  
},err=>{
  console.log('error in param',err);
  
})
  }
  
  card1 : [];
  getNoteOfLabel(labelId){
    console.log("Get note of Label");
    this.httpService.getRequestForNote('/getNoteOfLabel/'+labelId).subscribe( data => {
      console.log("Card",data);
      this.card1 = data;
      console.log("Card",this.card1);
    },error=>
    {
      this.snackbar.open("Error in getNoteOfLabel", "End-Now", { duration : 3000 });
    }
    )
  }
}
