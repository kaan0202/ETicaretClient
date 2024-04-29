import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base/base.component';
import { AuthService } from 'src/app/services/Common/auth.service';
import { UserService } from 'src/app/services/Common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
constructor(private userService : UserService, spinner:NgxSpinnerService, private authService : AuthService,private activatedRoute:ActivatedRoute,private route : Router,private socialAuthService:SocialAuthService){
  super(spinner)
  this.socialAuthService.authState.subscribe(async (user:SocialUser) =>{
    spinner.show(SpinnerType.Timer)
    console.log(user);

   switch(user.provider){
    case "GOOGLE":
  //     await userService.googleLogin(user,()=>{


  //  })
   break;
   case "FACEBOOK":{
    // await userService.facebookLogin(user,()=>{

    // })

   }
   spinner.hide(SpinnerType.Timer)
   authService.identityCheck();
  }
    })

}
 async login(txtUsernameOrEmail:string,txtPassword:string){
  this.showSpinner(SpinnerType.Timer)
    await this.userService.login(txtUsernameOrEmail,txtPassword,()=>{
      this.authService.identityCheck();

this.activatedRoute.params.subscribe(params => {
  const returnUrl:string = params["returnUrl"];
  if(returnUrl)
  this.route.navigate(["returnUrl"]);
})


      this.hideSpinner(SpinnerType.Timer);
    })

  }
  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}
