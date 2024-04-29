import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base/base.component';

import { Create_Product } from 'src/app/contracts/product';
import { FileUploadOptions } from 'src/app/services/Common/file-upload/file-upload.component';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/Common/models/products.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(  spinner:NgxSpinnerService,private productService:ProductService,private alertify:AlertifyService) {
   super(spinner);

  }

   ngOnInit(): void {

   }


  @Output() createdProduct:EventEmitter<Create_Product> = new EventEmitter();
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.Timer);
  const create_Product:Create_Product =new Create_Product();
  create_Product.name=name.value;
  create_Product.stock=parseInt(stock.value);
  create_Product.price=parseFloat(price.value)
  this.productService.create(create_Product,()=>{
    this.hideSpinner(SpinnerType.Timer)
    this.alertify.message("Ürün başarıyla eklenmiştir.",{
      messageType:MessageType.Success,
      position:Position.BottomRight,
      delay:5
    })
    this.createdProduct.emit(create_Product);
    },
    errorMessage => {
      // Hata durumunda çalışacak kod bloğu
      this.alertify.message(errorMessage, {
        messageType: MessageType.Warning,
        position: Position.TopRight,
        delay: 15
      });
    }
  );

  }

}
