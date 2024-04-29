import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,MatSidenavModule,MatListModule,RouterModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent,LayoutComponent
  ]
})
export class LayoutModule { }
