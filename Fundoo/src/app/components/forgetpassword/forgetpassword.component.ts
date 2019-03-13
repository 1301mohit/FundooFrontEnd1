import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) { }

model : any;
response : Object;

ngOnInit() {
}

email = new FormControl('' ,[Validators.required, Validators.email]);

getErrorMessage() {
return this.email.hasError('required') ? 'You must enter a value' :
this.email.hasError('email') ? 'Not a valid email':'';
}

forgetPassword(){
this.model ={
email : this.email.value
}
console.log(this.email.value);
this.httpService.postRequest('/forgetPassword?email='+this.email.value,'').subscribe(data => {
  //var response = JSON.parse(data);
  this.snackbar.open(data.statusMessage,"End Now", {duration:3000});
//this.snackbar.open('Sent a email in your email id', 'End Now', {duration:3000});
},
error => {
  this.snackbar.open('Retry','End Now',{duration:3000});
});
}
}
