import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component'
import { ResetpasswordComponent } from  './components/resetpassword/resetpassword.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {  MaincardComponent } from './components/maincard/maincard.component'
import { NoteComponent } from './components/note/note.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import { DisplayArchiveComponent } from './components/display-archive/display-archive.component';
import { DisplayTrashComponent } from './components/display-trash/display-trash.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { EditLabelNoteComponent } from './edit-label-note/edit-label-note.component';
import { ProfilepicComponent } from './components/profilepic/profilepic.component';
import { AuthGuard } from './auth.guard';
import { DisplayRemainderComponent } from './components/display-remainder/display-remainder.component';
import { CollaboratorDialogComponent } from './components/collaborator-dialog/collaborator-dialog.component';

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
    path : 'resetPassword/:token',
    component : ResetpasswordComponent
  },
  {
    canActivate: [AuthGuard], 
    path : 'dashboard',
    component : DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'note',
        pathMatch:'full'
      },
      {
        path : 'note',
        component : NoteComponent
      },
      {
        path : 'display-archive',
        component : DisplayArchiveComponent
      },
      {
        path : 'display-trash',
        component : DisplayTrashComponent
      },
      {
        path : 'edit-note',
        component : EditNoteComponent
      },
      {
        path : 'edit-label',
        component : EditLabelComponent
      },
      {
        path : 'edit-label-note/:labelId',
        component : EditLabelNoteComponent
      },
      {
        path : 'profilepic',
        component : ProfilepicComponent
      },
      {
        path : 'display-remainder',
        component : DisplayRemainderComponent
      },
      {
        path : 'collaborator-dialog',
        component : CollaboratorDialogComponent
      }
    ]
  }
  // {
  //   path : 'display-archive',
  //   component : DisplayArchiveComponent
  // }
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
