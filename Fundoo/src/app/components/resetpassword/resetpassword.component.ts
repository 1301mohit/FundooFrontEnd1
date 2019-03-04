import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  hide = true;
  hide1 = true;
  model: {};
  token: String;
  response : Object;

  constructor(private httpService: HttpService, 
    private router: Router,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute) { }

  ngOnInit() {
  }

  newPassword = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  resetPassword(){

    this.token = this.route.snapshot.paramMap.get('token');
    try{
      if(this.newPassword.value != this.confirmPassword.value) throw "Password and Confirm Password does not match"
      if(this.newPassword.value == '' || this.confirmPassword.value == '') throw "Fields are empty"
      this.httpService.putRequest("/user/"+this.token+"?password="+this.newPassword.value,'').subscribe(
        data => {
          var response = JSON.parse(data);
 //         localStorage.setItem('token',response.token);
          this.snackbar.open(response.statusMessage, 'End Now', {duration: 3000});
          this.router.navigate(['/login']);
        },
        error => {
          this.snackbar.open('Not reset password', 'End Now', {duration:3000});
        }
      );
    }catch(error){
      this.snackbar.open(error,"", {duration:3000});
    }
  }

}




//   });
        //   this.snackbar.open('Your new password is reset', 'End Now', {duration: 3000});
        //   this.router.navigate(['/login']);
        // },