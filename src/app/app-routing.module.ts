import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/components/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { CustomersModule } from './admin/components/customers/customers.module';
import { HomeComponent } from './ui/components/home/home.component';
import { ProductsComponent } from './ui/components/products/products.component';
import { CartsComponent } from './ui/components/carts/carts.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [{path:"admin",component:LayoutComponent,children:[
  {path:"",component:DashboardComponent},
  {path:"customers",loadChildren:()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule)},
  {path:"products",loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule)},
  {path:"orders",loadChildren:()=> import("./admin/components/orders/orders.module").then(module => module.OrdersModule)}
], canActivate:[AuthGuard]




},


{path:"",component:HomeComponent},
{path:"products",loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
{path:"carts", loadChildren: () => import("./ui/components/carts/carts.module").then(module => module.CartsModule)},
{path:"register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule)},
{path:"login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
