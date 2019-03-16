import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnDestroy } from '@angular/core';
//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';
import { MaterialModule } from 'src/material-module';
import { MaincardComponent } from './components/maincard/maincard.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { NoteComponent } from './components/note/note.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import { DisplayArchiveComponent } from './components/display-archive/display-archive.component';
import { DisplayTrashComponent } from './components/display-trash/display-trash.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    MaincardComponent,
    IconListComponent,
    NoteComponent,
    DisplayNotesComponent,
    DisplayArchiveComponent,
    DisplayTrashComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule ,
    ReactiveFormsModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MaterialModule,
  //  ChangeDetectorRef
 //   OnDestroy
  ],
  entryComponents: [EditNoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
