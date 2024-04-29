import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild(ListComponent) listComponents:ListComponent
  createdProduct(createdProduct:Create_Product){
   this.listComponents.getProducts();
  }
}
