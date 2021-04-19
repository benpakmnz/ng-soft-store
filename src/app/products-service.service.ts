import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {product} from '../app/Modals/interfaces';
import {products} from '../assets/mock-data';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  productUpdated = new Subject<product[]>();
  productsPerPage: number = null; 
  private productsList: product[] = [];
  constructor() {}


  getProductsList(resultsAmount):Observable<product[]>{
    this.productsPerPage = resultsAmount;
    this.productsList = products;
    return of(this.productsList.slice(0,resultsAmount))
    .pipe(delay(2000))
  }

  getProductItem(productId):Observable<product>{
    return of(this.productsList.find(product => product.id === productId))
  }

  productUpdate(updatedProduct: product){
    const productIndex= this.productsList.findIndex(product => product.id === updatedProduct.id);
    this.productsList[productIndex] = updatedProduct;
    this.productUpdated.next(this.productsList.slice(0 , this.productsPerPage))
  }

  // sortList(type: string){
  //   this.productsList.sort((a,b) => {
  //     if ( a.name < b.name ){
  //       return 1;
  //     }
  //     if ( a.name > b.name ){
  //       return -1;
  //     }
  //     return 0;
  //   }
  //   )
  //   this.getProductsList(this.productsPerPage)
  //   console.log(this.productsList)
  // }
}
