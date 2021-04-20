import { Component , OnInit, OnDestroy} from '@angular/core';
import { product } from './Modals/interfaces';
import { ProductsServiceService} from './products-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'my-store';
  getProducts: Subscription;
  getProductSelected: Subscription;
  productsList: product[] = [];
  productSelected: product = null;
  porductUpdateSubscription: Subscription;
  isProductUpdatedAproval: boolean = false;

  constructor( private ProductsServiceService: ProductsServiceService){
  }

  ngOnInit(){
    this.porductUpdateSubscription = this.ProductsServiceService.updateList
    .subscribe(
      (productsList: product[]) => {
        this.productsList = productsList;
        if(this.productSelected){
          this.productUpdateAprovalAlert(true);
          this.productSelected = this.productsList.find(index => index.id === this.productSelected.id);
        }
      }
    );
    this.getProductsList();
  }

  getProductsList(): void {
    this.getProducts = this.ProductsServiceService.getProductsList(4)
    .subscribe(products => this.productsList  = products);
  }

  getProduct(productId:number){
    this.getProductSelected = this.ProductsServiceService.getProductItem(productId)
    .subscribe(product => this.productSelected  = product);
  }
  
  productUpdateHandler(updatedProduct){
    this.ProductsServiceService.productUpdate(updatedProduct);
  }

  productUpdateAprovalAlert(isShow){
    this.isProductUpdatedAproval = isShow;
    isShow? setTimeout(() => this.isProductUpdatedAproval = false, 3000) : null;
  }

  sortProducts(sortBy: string){
    this.ProductsServiceService.sortList(sortBy);
  }

  filterListHandler(value: string){
    this.ProductsServiceService.filterList(value);
  }

  ngOnDestroy(){
    this.getProducts.unsubscribe();
    this.getProductSelected.unsubscribe();
    this.porductUpdateSubscription.unsubscribe();
  }
}