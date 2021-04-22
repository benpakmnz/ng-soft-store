import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {productInterface} from './Modals/interfaces';
import {productsData} from '../assets/mock-data';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  updateList = new Subject<productInterface[]>();
  updateSelectedProduct = new Subject<productInterface>();
  productsPerPage: number = null; 
  private productsList: productInterface[] = [];
  private selectedProduct: productInterface;
  constructor() {}


  getProductsList(resultsAmount):Observable<productInterface[]>{
    this.productsPerPage = resultsAmount;
    this.productsList = productsData;
    this.sortList('creationDate');
    return of(this.productsList.slice(0,resultsAmount))
    .pipe(delay(2000))
  }

  getProduct(productId:number):Observable<productInterface>{
    return of(productsData.find(product => product.id === Number(productId)))
  }

  productUpdate(updatedProduct: productInterface){
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
    this.productsList = productsData.filter(product => {
      if(product.name.includes(value)){
        return product.name.includes(value)
      }else{
        return product.description.includes(value)
      }
    });
    this.updateList.next(this.productsList.slice(0 , this.productsPerPage))
  }
}
