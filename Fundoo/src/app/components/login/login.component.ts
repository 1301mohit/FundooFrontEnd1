import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  model : any;
  data1 : any;
  message : string;
  message1 : any;
  respose: any;

  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  response: Object;

  
  
  constructor(private httpService: HttpService,
              private router: Router,
              private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage1() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  login()
  {
    try{
      if(this.email.value == '' || this.password.value == '') throw "Fields are missing";
      this.model = {
        "email":this.email.value,
        "password":this.password.value
      }

      this.httpService.postRequest('/login', this.model).subscribe(data => {
        
        console.log("post request Data:",data);
        //var response = JSON.parse(data);
//        localStorage.setItem('token', response.token);
        if(data.statusCode === "101"){
           localStorage.setItem('token', data.token);
           this.snackbar.open(data.statusMessage, 'logged-in', {duration:3000});
           console.log(data.token);
           var token = localStorage.getItem('token')
           console.log("token 2",token);
           this.router.navigateByUrl('/dashboard');
         }
      },
      err => {
        this.snackbar.open('Login unSuccessful', 'End Now', {duration:3000});
      });
    }catch(error)
    {
      this.snackbar.open(error, 'End Now', {duration:3000});
    }
  }

}
