import { Component, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { product } from '../../Modals/interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges{
  @Input() productSelected: product;
  @Output() updatedProduct= new EventEmitter<product>();
  productForm: FormGroup;
  errorMassages = {
    required: 'This field is required',
    minPrice: 'Price must be greater then 0'
  };
  constructor() { }

  ngOnChanges(){
    this.productForm = new FormGroup({
      'name': new FormControl(this.productSelected.name, Validators.required),
      'description': new FormControl(this.productSelected.description),
      'price': new FormControl(this.productSelected.price, [Validators.min(0),Validators.required])
    });
  }

  onSubmit(){
    this.updatedProduct.emit({...this.productSelected, ...this.productForm.value});
  }

}
