import { Component } from '@angular/core';
import { product } from './Modals/interfaces';
import {products} from '../assets/mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  productsList: product[] = [];
  productSelected: product = { 
    description: "",
    id: null,
    name: "",
    price: null,
    urlImage: "",
    thumbnailImage: "",
    creationDate: null};

constructor(){
  this.productsList = products;
}

  productSelection(productId:number){
    this.productSelected = this.productsList[productId];
    console.log(this.productSelected)
  }
}