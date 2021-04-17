import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { product } from './Modals/interfaces';
import {products} from '../assets/mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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

  saveChangesDisabled: boolean = false;
  selectedProductName: string = "";
  isProductUpdate: boolean = false;
  productForm: FormGroup;

  ngOnInit(){
  }

constructor(){
  this.productsList = products;
}

  productSelection(productId:number){
    this.productSelected = Object.assign({},this.productsList[productId]);
    this.selectedProductName = this.productsList[productId].name;

    this.productForm = new FormGroup({
      'productName': new FormControl(this.productSelected.name, Validators.required),
      'productDescription': new FormControl(this.productSelected.description),
      'productPrice': new FormControl(this.productSelected.price, [Validators.min(10),Validators.required])
    })
  }

  onSubmit(){
    console.log(this.productForm)
  }

  sortlistHandler(event){
    console.log(event)
    this.productsList.sort((a,b) => {
      if ( a.name < b.name ){
        return 1;
      }
      if ( a.name > b.name ){
        return -1;
      }
      return 0;
    }
    )
  }
}