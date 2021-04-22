import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {product} from '../app/Modals/interfaces';
import {productsData} from '../assets/mock-data';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  updateList = new Subject<product[]>();
  updateSelectedProduct = new Subject<product>();
  productsPerPage: number = null; 
  private productsList: product[] = [];
  private selectedProduct: product;
  constructor() {}


  getProductsList(resultsAmount):Observable<product[]>{
    this.productsPerPage = resultsAmount;
    this.productsList = productsData;
    this.sortList('creationDate');
    return of(this.productsList.slice(0,resultsAmount))
    .pipe(delay(2000))
  }

  getProductItem(productId: number){
    this.selectedProduct = productsData.find(product => product.id === productId)
    this.updateSelectedProduct.next(this.selectedProduct);
  }

  getProduct():Observable<product>{
    return of(this.selectedProduct)
  }

  productUpdate(updatedProduct: product){
    const productIndex= productsData.findIndex(product => product.id === updatedProduct.id);
    productsData[productIndex] = updatedProduct;
    this.selectedProduct = updatedProduct;
    this.productsList = productsData;
    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
    this.updateSelectedProduct.next(this.selectedProduct);
    return of(updatedProduct.name);
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
    this.productsList = productsData.filter(product => product.name.includes(value))
    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
  }
}
