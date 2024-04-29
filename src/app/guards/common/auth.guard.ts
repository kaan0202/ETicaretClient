import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/Common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper:JwtHelperService, private router:Router,private toastr:CustomToastrService,private spinner:NgxSpinnerService,private authService: AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

this.spinner.show(SpinnerType.Timer);

     if (!_isAuthenticated) {
  this.router.navigate(["login"],{queryParams:{returnUrl:state.url}}); //query params kısmı kullanıcı login olursa diye url i tutmaya yarar.
  this.spinner.hide(SpinnerType.Timer);
  this.toastr.showMessage("Giriş yapınız","",{toastMessageType:ToastrMessageType.Warning,toastPosition:ToastrPosition.TopRight});


     }


      return true;
  }

}

