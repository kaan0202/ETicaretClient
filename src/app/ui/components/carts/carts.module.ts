import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './carts.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartsComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild([
      { path: "", component: CartsComponent }
    ]),
  ]
})
export class CartsModule { }
