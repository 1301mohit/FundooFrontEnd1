import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  constructor(private httpService: HttpService,
    private router: Router,
    private snackbar: MatSnackBar) { }

  label=[];

  model : any;

  name = new FormControl('');
  newName = new FormControl('');
 
  ngOnInit() {
    this.getAllLabel();
  }

  getAllLabel() {
    this.httpService.getRequestForNote('/getAllLabels').subscribe(data => {
      console.log('data is in label', data);
      this.label = data;
      console.log(this.label[0].name);
    }, err => {
      this.snackbar.open(err, "End-now", { duration : 3000 })
    })
  }

  create(){
    this.model = {
      "name" : this.name.value
    }
    this.httpService.postRequestForNote('/createLabel', this.model).subscribe(data => {
      console.log('Create label');
      this.snackbar.open(data.statusMessage, "End-now", { duration : 3000 })
      this.getAllLabel();
    }, err => {
      this.snackbar.open(err, "End-now", { duration : 3000 })
    })
  }

  delete(labelId){
    this.httpService.deleteRequestForNote('/deleteLabel/'+labelId).subscribe( data => {
      console.log('Delete label');
      this.snackbar.open(data.statusMessage, "End-Now", { duration : 3000})
      this.getAllLabel();
    }, err => {
      this.snackbar.open(err, "End-now", { duration : 3000 })
    })
  }

  update(labelId){
    this.model = {
      "name" : this.newName.value
    }
    this.httpService.postRequestForNote('/updateLabel/'+labelId, this.model).subscribe( data => {
      console.log('Update label');
      this.snackbar.open(data.statusMessage, "End-Now", { duration : 3000})
      this.getAllLabel();
    },err => {
      this.snackbar.open(err, "End-now", { duration : 3000 })
    })
  }
}
