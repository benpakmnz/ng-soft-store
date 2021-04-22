import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService} from '../../products-service.service';
import { Subscription } from 'rxjs/Subscription';
import { productInterface } from '../../Modals/interfaces';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  productSelected: productInterface = {
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
  constructor(private route: ActivatedRoute, private ProductsService: ProductsService ) { 
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.getProduct = this.ProductsService.getProduct(params.id)
        .subscribe(product => {
          this.productSelected = product
          this.formInit()
        });
      }
    )

    this.getProductChanges = this.ProductsService.updateSelectedProduct
    .subscribe((product:productInterface) => {
        this.approvalName=this.productSelected.name
        this.productUpdateAprovalAlert(true);
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
    this.ProductsService.productUpdate({...this.productSelected, ...this.productForm.value});
  }

  productUpdateAprovalAlert(isShow){
    this.isProductUpdatedAproval = isShow;
    isShow? setTimeout(() => this.isProductUpdatedAproval = false, 3000) : null;
  }

}
