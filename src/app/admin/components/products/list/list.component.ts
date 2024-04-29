import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { ListProduct } from 'src/app/contracts/list-product';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/Common/models/products.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

import { BaseComponent, SpinnerType } from 'src/app/base/base/base.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogService } from 'src/app/services/Common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
// Angular ListComponent, bir liste sayfasını temsil eder.
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements AfterViewInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }

  // Mat-Table'da görüntülenecek sütunlar
  displayedColumns: string[] = ['name', 'stock', 'price', 'createddate', 'updateddate','photos', 'edit', 'delete'];

  // Mat-Table veri kaynağı
  dataSource: MatTableDataSource<ListProduct> = null;

  // MatPaginator öğesi
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Ürünleri getirme işlemi
  async getProducts() {
    this.showSpinner(SpinnerType.Timer);
    const allProducts: { totalCount: number, products: ListProduct[] } = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.Timer),
      errorMessage => this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        position: Position.TopRight,
        delay: 15
      })
    );
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);

    this.paginator.length = allProducts.totalCount;
  }

  async addProductImages(id:string){
    this.dialogService.openDialog({componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px"
      }

    })
  }
  // Sayfa değiştikçe çalışacak fonksiyon
  async pageChanged() {
    await this.getProducts();
  }

  // Component ilk kez oluşturulduktan sonra çalışacak fonksiyon
  async ngAfterViewInit() {
    await this.getProducts();
  }
}
