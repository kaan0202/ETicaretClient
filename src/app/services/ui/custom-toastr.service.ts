import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService){}

    showMessage(message:string,title:string,toastrOptions:Partial<ToastrOptions>){
      this.toastr[toastrOptions.toastMessageType](message,title,{positionClass:toastrOptions.toastPosition})
      
  }
}

export class ToastrOptions{
  toastMessageType:ToastrMessageType;
  toastPosition:ToastrPosition;

}
export enum ToastrMessageType{
  Success="success",
  Warning="warning",
  Error="error",
  Info="info"
}
export enum ToastrPosition{
  TopRight="toast-top-right",
  BottomRight="toast-bottom-right",
  TopLeft="toast-top-left",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  TopCenter="toast-top-center",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width"
}