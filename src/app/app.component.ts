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
  productSelected: product = {
    description: "",
    id: null,
    name: "",
    price: null,
    urlImage: "",
    thumbnailImage: "",
    creationDate: null
  };
  porductUpdateSubscription: Subscription;
  getProductSubscription: Subscription;

  constructor( private ProductsServiceService: ProductsServiceService){
  }

  ngOnInit(){
    this.porductUpdateSubscription = this.ProductsServiceService.updateList
    .subscribe(
      (productsList: product[]) => {
        this.productsList = productsList;
      }
    );
    this.getProductSubscription = this.ProductsServiceService.updateSelectedProduct
    .subscribe(
      (productSelected: product) => {
        this.productSelected = productSelected;
      }
    );
    this.getProductsList();
  }

  getProductsList(): void {
    this.getProducts = this.ProductsServiceService.getProductsList(4)
    .subscribe(products => this.productsList  = products);
  }

  getProduct(productId:number){
    this.ProductsServiceService.getProductItem(productId)
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