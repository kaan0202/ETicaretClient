import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FileUploadModule } from 'src/app/services/Common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DeleteDirective } from '../../directives/delete.directive';
import { DialogModule } from 'src/app/dialogs/dialog.module';


@NgModule({
  declarations: [ProductsComponent, CreateComponent, ListComponent,DeleteDirective
  ],
  imports: [
    CommonModule,MatFormFieldModule,MatSidenavModule,MatPaginatorModule,MatTableModule,MatInputModule,MatSelectModule, RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),FileUploadModule,DialogModule
  ]
})
export class ProductsModule { }
