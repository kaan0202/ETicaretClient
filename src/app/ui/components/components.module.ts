import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,HomeModule,ProductsModule,CartsModule,RegisterModule
  ]
})
export class ComponentsModule { }
