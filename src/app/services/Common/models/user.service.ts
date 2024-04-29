import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Token } from 'src/app/contracts/Token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private toastr:CustomToastrService) { }

  async create(user:User):Promise<Create_User>{

    const observable:Observable<Create_User | User> =this.httpClientService.post<Create_User | User>({controller:"users",},user);
    return await firstValueFrom(observable) as Create_User
  }

  async login(userNameOrEmail:string,password:string,callBackFunction?: ()=> void){
   const observable= this.httpClientService.post<any | Token>({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password});
    const token : Token = await firstValueFrom(observable) as Token
    if(token){
      localStorage.setItem("accessToken",token.accessToken);

    this.toastr.showMessage("Kullanıcı girişi başarılı","Durum",{toastMessageType:ToastrMessageType.Success,toastPosition:ToastrPosition.TopRight});
    callBackFunction();
    }
  }
  async googleLogin(user:SocialUser,callBackFunction?:()=> void){
    const observable =this.httpClientService.post<SocialUser|Token>({action:"google-login",controller:"users"},user);
    const tokenResponse:Token =await firstValueFrom(observable) as Token;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.accessToken)
      this.toastr.showMessage("Giriş yapıldı","",{toastMessageType:ToastrMessageType.Success,toastPosition:ToastrPosition.TopRight})
    }
callBackFunction();
  }
}
