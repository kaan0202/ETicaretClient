import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/components/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { HttpClientModule } from '@angular/common/http';

import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,LoginComponent





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AdminModule,UiModule, BrowserAnimationsModule,NgxSpinnerModule,ToastrModule.forRoot(),HttpClientModule,JwtModule.forRoot({
      config:{
        tokenGetter:()=> localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7131"]
      }
    }),SocialLoginModule,GoogleSigninButtonModule
  ],
  exports:[GoogleSigninButtonModule],
  providers: [ { provide: "baseUrl", useValue: "https://localhost:7261/api", multi: true },{provide:"getUrl",useValue:"https://localhost:7261"},{
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("902986185803-4dl068flq4g27bpj299khhlq7es3g988.apps.googleusercontent.com")
        },{
          id:FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1417604472453121")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
