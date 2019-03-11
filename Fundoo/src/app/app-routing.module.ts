import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component'
import { ResetpasswordComponent } from  './components/resetpassword/resetpassword.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {  MaincardComponent } from './components/maincard/maincard.component'
const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'forgetpassword',
    component : ForgetpasswordComponent
  },
  {
    path : 'user/:token',
    component : ResetpasswordComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    children:[
      {
        path : '',
        component : MaincardComponent
      }
    ]
  }
  // {
  //   path : 'maincard',
  //   component : MaincardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
