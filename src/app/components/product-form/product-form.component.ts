import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsServiceService} from '../../products-service.service';
import { Subscription } from 'rxjs/Subscription';
import { product } from '../../Modals/interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  productSelected: product = {
    description: "",
    id: null,
    name: "",
    price: null,
    urlImage: "",
    thumbnailImage: "",
    creationDate: null
  };
  getProduct:Subscription;
  getProductChanges: Subscription;
  isProductUpdatedAproval: boolean = false;
  approvalName: string= '';
  productForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'description': new FormControl(''),
    'price': new FormControl('', [Validators.min(0),Validators.required])
  });

  errorMassages = {
    required: 'This field is required',
    minPrice: 'Price must be greater then 0'
  };
  constructor( private ProductsServiceService: ProductsServiceService ) { 
  }

  ngOnInit(){
    this.getProduct = this.ProductsServiceService.getProduct()
    .subscribe(product => {
      this.productSelected = product
      this.formInit()
    });

    this.getProductChanges = this.ProductsServiceService.updateSelectedProduct
    .subscribe((product:product) => {
        if(this.productSelected.id === product.id){
          this.approvalName=this.productSelected.name
          this.productUpdateAprovalAlert(true);
        }
        this.productSelected = product;
        this.formInit()
    })
  }

  formInit(): void{
    this.productForm.reset();
    this.productForm.setValue({
      'name': this.productSelected.name,
      'description': this.productSelected.description,
      'price': this.productSelected.price
    });
  }

  onSubmit(){
    this.ProductsServiceService.productUpdate({...this.productSelected, ...this.productForm.value});
  }

  productUpdateAprovalAlert(isShow){
    this.isProductUpdatedAproval = isShow;
    isShow? setTimeout(() => this.isProductUpdatedAproval = false, 3000) : null;
  }

}
