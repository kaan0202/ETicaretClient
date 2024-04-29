import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private toastr:CustomToastrService) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.Timer);
    this.toastr.showMessage("Sepet","",{toastMessageType:ToastrMessageType.Success,toastPosition:ToastrPosition.TopRight});
  }
}

