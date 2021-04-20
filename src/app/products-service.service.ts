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
  updateList = new Subject<product[]>();
  productsPerPage: number = null; 
  private productsList: product[] = [];
  constructor() {}


  getProductsList(resultsAmount):Observable<product[]>{
    this.productsPerPage = resultsAmount;
    this.productsList = products;
    this.sortList('creationDate');
    return of(this.productsList.slice(0,resultsAmount))
    .pipe(delay(2000))
  }

  getProductItem(productId):Observable<product>{
    return of(this.productsList.find(product => product.id === productId))
  }

  productUpdate(updatedProduct: product){
    const productIndex= products.findIndex(product => product.id === updatedProduct.id);
    products[productIndex] = updatedProduct;
    this.productsList = products;
    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
  }

  sortList(sortBy: string){
    switch (sortBy){
      case 'name':
        this.productsList.sort((a,b) => a.name > b.name? 1: -1)
      break;
      case 'creationDate':
        this.productsList.sort((a,b) => a.creationDate > b.creationDate? 1: -1)
    }

    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
  }

  filterList(value: string){
    console.log(value)
    this.productsList = products.filter(product => product.name.includes(value))
    console.log(this.productsList)
    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
  }
}
