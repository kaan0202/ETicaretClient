import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { GoogleSigninButtonDirective, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,RouterModule.forChild([
      {path:"",component:LoginComponent}]),
  ]
})
export class LoginModule { }
