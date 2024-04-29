import { AfterViewInit, Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadComponent, FileUploadOptions } from 'src/app/services/Common/file-upload/file-upload.component';
import { List_Product_Image } from 'src/app/contracts/list-product-image';
import { ProductService } from 'src/app/services/Common/models/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base/base.component';
import { DialogService } from 'src/app/services/Common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
 declare var $:any;
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements AfterViewInit {
/**
 *
 */
constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,@Inject(MAT_DIALOG_DATA)public data: ImageState|string
 ,private productService : ProductService,private spinner:NgxSpinnerService,private dialogService:DialogService) {
  super(dialogRef);

}


@Output() options:Partial<FileUploadOptions> = {
  accept:".png, .jpg, .jpeg, .gif",
  action:"Upload",
  controller:"products",
  explanation:"Ürün resmini yükleyiniz.",
  isAdminPage:true,
  queryString:`id=${this.data}`
}
images:List_Product_Image[];



 async ngAfterViewInit() {
  this.spinner.show(SpinnerType.Timer)
  this.images =await this.productService.readImages(this.data as string,()=>{

  this.spinner.hide(SpinnerType.Timer)


 });


}
async deleteImage(imageId:string,event:any){
  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed: async ()=>{
      this.spinner.show(SpinnerType.Timer)

      this.productService.deleteImage(this.data as string,imageId, ()=>{
        this.spinner.hide(SpinnerType.Timer)

        var card = $(event.srcElement).parent().parent().parent()

        card.fadeOut(500);
      })

    }
  })


}



}


export enum ImageState{
  Close
}
