import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/Common/http-client.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})

export class DeleteDirective {

  constructor(private element:ElementRef,private renderer:Renderer2,private httpService:HttpClientService,private spinner:NgxSpinnerService,public dialog: MatDialog,private alertifyService:AlertifyService) {
   const img = renderer.createElement("img");
   img.setAttribute("src","../../../../../assets/delete.png")
   img.setAttribute("style","cursor:pointer");
   
   renderer.appendChild(element.nativeElement,img);

   }
   @Input() controller:string;
   @Input() id:string;
   @Output() callback:EventEmitter<any>=new EventEmitter();
   @HostListener("click")
   async onClick(){
    this.openDialog(async ()=>{
      this.spinner.show(SpinnerType.Timer);
      const td=this.element.nativeElement;
     await  this.httpService.delete({controller:this.controller},this.id).subscribe(data=>{
      $(td.parentElement).animate({ opacity:0,left:"+=50",height:"toggle"},700,()=>{
        this.callback.emit();
        this.alertifyService.message("Ürün Başarılıyla Silindi",{messageType:MessageType.Success,position:Position.TopRight,delay:1})
      });
      
     },(errorResponse:HttpErrorResponse) => {
      this.alertifyService.message("Ürün Silinemedi",{messageType:MessageType.Error,position:Position.TopRight,delay:1})
      this.spinner.hide();
     });
     
    })
    
    
   }
   openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
         afterClosed();
      }
    });
  }
}