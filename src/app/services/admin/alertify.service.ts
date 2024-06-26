import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  //message(message:string,messageType:MessageType,position:Position,delay:number=3,dismissOthers:boolean=false)
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    if(options.dismissOthers)
     {const msg= alertify[options.messageType](message);
      msg.dismissOthers();
     }

   
  }
  dismiss(){
    alertify.dismissAll();
  }
  

}
export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.TopRight;
  delay:number=3;
  dismissOthers:boolean=true;
}
export enum MessageType{
  Error="error",
  Notify= "notify",
  Success="success",
  Message="message",
  Warning ="warning"

}
export enum Position{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomCenter="bottom-center",
  BottomRight="bottom-right",
  BottomLeft="bottom-left"
}
