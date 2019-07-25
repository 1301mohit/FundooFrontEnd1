import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/model/user';
//import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private httpService: HttpService,
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  user = new User();
  // registerForm = this.fb.group({
  //   firstName: new FormControl(this.user.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]),
  //   lastName: new FormControl(this.user.lastName, [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]),
  //   email: new FormControl(this.user.email, [Validators.required, Validators.email, this.noWhitespaceValidator]),
  //   mobileNumber: new FormControl(this.user.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), this.noWhitespaceValidator]),
  //   password: new FormControl(this.user.password, [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator]),
   
  // });
  // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator])

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]),
      email: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator]),
     // confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator])
    });
  }

  message = '';
  selected = '';
  hide = true;
  hide1 = true;
  model: any;
  response: Object;
  message1 = '';

  // constructor(private httpService: HttpService,
  //   private router: Router,
  //   private snackbar: MatSnackBar
  // ) { }

  // public noWhitespaceValidator(control: FormControl) {
  //   const isWhitespace = (control.value || '').trim().length === 0;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespace': true };
  // }

 




  // firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]);
  // lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]);
  // email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
  // mobileNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), this.noWhitespaceValidator]);
  // password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator]);
   confirmPassword = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noWhitespaceValidator]);


  //localStorage.setItem('fName', this.firstName.value);
 

 

  getErrorMessage(controlName : string, alias : string) {
    const control = this.registerForm.controls[controlName];
    if(control.errors.required){
      return alias + ' is required'
    }

    if(control.errors.email){
      return alias + ' is invalid'
    }

    if(control.errors.minLength){
      return alias + ' should have at least ' + control.errors.minLength.requiredLength + ' characters'; 
    }

    if(control.errors.maxLength){
      return alias + ' should have more than ' + control.errors.maxLength.requiredLength + ' characters'; 
    }

    if(control.errors.whitespace){
      return 'Invalid ' + alias.toLowerCase();
    }

    if(control.errors.pattern){
      return 'Invalid ' + alias.toLowerCase();
    }
  }
  // getErrorMessageOfFirstName() {
  //   return this.firstName.hasError('required') ? 'Enter first name' :
  //     this.firstName.hasError('pattern') ? 'Enter alphabatic value only' : 
  //     this.firstName.hasError('whitespace') ? 'Enter first name' : '';
  // }

  // getErrorMessageOfEmail() {
  //   return this.email.hasError('required') ? 'Enter email' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //     this.email.hasError('whitespace') ? 'Enter email' : '';
  // }

  // getErrorMessageOfLastName() {
  //   return this.lastName.hasError('required') ? 'Enter last name' :
  //     this.lastName.hasError('pattern') ? 'Enter alphabatic value only' : 
  //     this.lastName.hasError('whitespace') ? 'Enter last name' : '';
  // }

  // getErrorMessagePassword() {
  //   return this.password.hasError('required') ? 'Enter password' :
  //     this.password.hasError('pattern') ? 'Enter password' :
  //       this.password.hasError('minLength') ? 'Enter minimum 5 character' :
  //         this.password.hasError('maxLength') ? 'Enter maximum 10 character' : 
  //           this.password.hasError('whitespace') ? 'Enter password' : '';
  // }

  getErrorMessageOfConfirmPassword() {
    return this.confirmPassword.hasError('required') ? 'Enter confirm password' :
      this.confirmPassword.hasError('pattern') ? 'Enter confirm password' :
        this.confirmPassword.hasError('minLength') ? 'Enter minimum 5 character' :
          this.confirmPassword.hasError('maxLength') ? 'Enter maximum 10 character' :
            this.confirmPassword.hasError('whitespace') ? 'Enter confirm password' : '';
  }

  // getErrorMessageOfMobileNumber() {
  //   return this.mobileNumber.hasError('required') ? 'Enter mobile number' :
  //     this.mobileNumber.hasError('minlength') ? 'Not a valid mobile number' :
  //       this.mobileNumber.hasError('maxlength') ? 'Not a valid mobile number' :
  //         this.mobileNumber.hasError('pattern') ? 'Not a valid mobile number' : 
  //           this.mobileNumber.hasError('whitespace') ? 'Enter mobile number' : '';
  // }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onSubmit() {
    console.log("user model", this.user);
    //console.log("firstName",this.firstName.value);
    console.log("registerForm",this.registerForm);
    try {
      if (this.registerForm.value.password != this.confirmPassword.value) throw "password and confirmpassword does not match"
      if (this.registerForm.value.firstName == '' || this.registerForm.value.lastName == '' || this.registerForm.value.email == '' || this.registerForm.value.mobileNumber == '' || this.registerForm.value.password == '' || this.confirmPassword.value == '') throw "Fields are missing"
      // this.model = {
      //   "firstName": this.firstName.value,
      //   "lastName": this.lastName.value,
      //   "email": this.email.value,
      //   "mobileNumber": this.mobileNumber.value,
      //   "password": this.password.value
      // }
      //console.log("model----", this.model);
      this.httpService.postRequest('/user/register', this.registerForm.value).subscribe(
        data => {
          console.log("Registration Component");
          console.log("Data:", data);
          this.snackbar.open(data.statusMessage, 'End now', { duration: 5000 });
          this.router.navigateByUrl('/login');
        },
        error => {
          this.snackbar.open('Not Registered', 'End now', { duration: 3000 });
          console.log("error: ", error)
        });
    } catch (error) {
      this.snackbar.open(error, "", { duration: 3000 });
    }
  }
}




// localStorage.setItem(fName,this.firstName.value);
// localStorage.setItem('lName',this.lastName.value);// localStorage.setItem('emailId',this.email.value);