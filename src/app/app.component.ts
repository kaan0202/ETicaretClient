import { Component } from '@angular/core';
import { AuthService } from './services/Common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(public authService:AuthService, private toastr : CustomToastrService,private route : Router){
    authService.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.route.navigate([""]);
    this.authService.identityCheck();
    this.toastr.showMessage("Oturum Kapatılmıştır","Durum",{toastMessageType:ToastrMessageType.Warning,toastPosition:ToastrPosition.TopRight})
  }
}
