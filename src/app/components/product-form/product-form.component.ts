import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { product } from '../../Modals/interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() productSelected: product;
  @Output() updatedProduct= new EventEmitter<product>();
  isProductUpdate: boolean = false;
  productForm: FormGroup;
  errorMassages = {
    required: 'This field is required',
    minPrice: 'Price must be greater then 0'
  };
  constructor() { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'name': new FormControl(this.productSelected.name, Validators.required),
      'description': new FormControl(this.productSelected.description),
      'price': new FormControl(this.productSelected.price, [Validators.min(0),Validators.required])
    });
  }

  onSubmit(){
    this.isProductUpdate = true;
    
    setTimeout(()=>{
      this.updatedProduct.emit({...this.productSelected, ...this.productForm.value});
      this.isProductUpdate = false;
    }, 5000)
  }

}
