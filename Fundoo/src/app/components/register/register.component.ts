import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {
  }

  message = '';
  selected = '';
  hide = true;
  hide1 = true;
  model:any;
  response: Object;
  message1='';

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  mobileNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  

  constructor(private httpService: HttpService, 
              private router: Router,
              private snackbar : MatSnackBar
  ) { }

  getErrorMessageOfEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageOfFirstName() {
    return this.firstName.hasError('required') ? 'You must enter a value' :'';
  }

  getErrorMessageOfLastName(){
    return this.lastName.hasError('required') ? 'You must enter a value' :'';
  }

  getErrorMessagePassword(){
    return this.password.hasError('required') ? 'You must enter a value' :'';
  }

  getErrorMessageOfConfirmPassword(){
    return this.confirmPassword.hasError('required') ? 'You must enter a value' :'';
  }

  getErrorMessageOfMobileNumber() {
    return this.mobileNumber.hasError('required') ? 'You must enter a value' :
        this.mobileNumber.hasError('minlength') ? 'Not a valid mobile number' :
        this.mobileNumber.hasError('maxlength') ? 'Not a valid mobile number' :
        '';
  }

  register(){
    console.log("model----",this.model);
    try{
      if(this.password.value != this.confirmPassword.value) throw "password and confirmpassword does not match"
      if(this.firstName.value == '' || this.lastName.value == '' || this.email.value == '' || this.mobileNumber.value == '' || this.password.value == '' || this.confirmPassword.value == '') throw "Fields are missing"
      this.model = {
      "firstName":this.firstName.value,
      "lastName":this.lastName.value,
      "email":this.email.value,
      "mobileNumber":this.mobileNumber.value,
      "password":this.password.value
      }
      this.httpService.postRequest('/register',this.model).subscribe(
      data => {
      console.log("RS");
      console.log("Data:",data);
      this.snackbar.open(data.statusMessage, 'End now', {duration: 5000});
      this.router.navigateByUrl('/login');
    },
    error=> {
      this.snackbar.open('Not Registered', 'End now', {duration: 3000});
      console.log("error: ",error)
    });
    }catch(error){
      this.snackbar.open(error,"", {duration: 3000});
    }
  }

  
}
