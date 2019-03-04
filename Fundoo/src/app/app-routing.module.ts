import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component'
import { ResetpasswordComponent } from  './components/resetpassword/resetpassword.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
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
    path : 'resetpassword',
    component : ResetpasswordComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
