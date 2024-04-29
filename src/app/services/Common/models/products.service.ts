import { Inject, Injectable } from '@angular/core';

import { Create_Product } from 'src/app/contracts/product';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list-product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list-product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClientService,@Inject("getUrl") private getUrl:string) {}
    create(product:Create_Product,successCallBack?:()=> void,errorCallBack?:(errorMessage:string)=>void ){
      this.httpClient.post({controller:"products"},product).subscribe(result => {
        successCallBack();
      },(errorResponse:HttpErrorResponse) => {
        const _error:Array<{key:string,value:Array<string>}> =errorResponse.error;
        let message ="";
        _error.forEach((v,index) =>{
          v.value.forEach((_v,_index)=>{
            message+=`${_v}<br>`
          })
        })
        errorCallBack(message);
      })

    }
    async read(page: number = 0, size:number = 5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,products:ListProduct[]}>{
     const promiseData:Promise<{totalCount:number,products:ListProduct[]}>= this.httpClient.get<{totalCount:number,products:ListProduct[]}>({controller:"products",queryString:`page=${page}&size=${size} `}).toPromise();
     promiseData.then(d =>successCallBack())
     .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

     return await promiseData;
    }

    async delete(id: string) {
      const deleteObservable: Observable<any> = this.httpClient.delete<any>({
        controller: "products"
      }, id);

      await firstValueFrom(deleteObservable);
    }

    async readImages(id:string, successCallBack?:()=> void):Promise<List_Product_Image[]>{
      const getObservable:Observable<List_Product_Image[]> = this.httpClient.get<List_Product_Image[]>({action:"GetProductImages",controller:"products"},id);
     const images:List_Product_Image[] =  await firstValueFrom(getObservable)
     successCallBack();
     return images;

    }
    async deleteImage(id:string,imageId:string,successCallBack?:()=> void){
     const deleteObservable = this.httpClient.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`
     },id)
     await firstValueFrom(deleteObservable);
     successCallBack();
    }

}

