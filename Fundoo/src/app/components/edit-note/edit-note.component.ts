import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {


  constructor(private httpService: HttpService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  //@Input() cardsArray=[];
  //@Input() card;
  color: String;
  card = [];
  // flag1 = true;
  ngOnInit() {
    this.getAllCard();
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  getAllCard() {
    this.httpService.getRequestForNote('/getAllNotes').subscribe(data => {
      console.log('data is in note', data);
      this.card = data;
    }, err => {
      console.log(err);
    })
  }

  changeOfColor($event) {
    this.color = $event;
  }

}
