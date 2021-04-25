import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { productInterface } from '../../Modals/interfaces';
import { ProductsService} from '../../products-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  getProducts: Subscription;
  productsList: productInterface[] = [];
  porductUpdateSubscription: Subscription;
  productSelectedSubscription: Subscription;
  productSelectedId: number = null;
  isMobile: boolean = false;

  constructor(private ProductsServiceService: ProductsService){}

  ngOnInit(){
    this.porductUpdateSubscription = this.ProductsServiceService.updateList
    .subscribe(
      (productsList: productInterface[]) => {
        this.productsList = productsList;
      }
    );
    this.productSelectedSubscription = this.ProductsServiceService.selectedProductId
    .subscribe(
      (productId: number) => {
        this.productSelectedId = Number(productId);
      }
    )

    this.isMobile = window.innerWidth <= 1024;
    this.getProductsList();
  }

  getProductsList(): void {
    this.getProducts = this.ProductsServiceService.getProductsList(4)
    .subscribe(products => {
      this.productsList  = products
    });
  }

  sortProducts(sortBy: string){
    this.ProductsServiceService.sortList(sortBy);
  }

  filterListHandler(value: string){
    this.ProductsServiceService.filterList(value);
  }

  @HostListener('window:resize', ['$event'])
    onResize() {
    this.isMobile = window.innerWidth <= 1024;
  }

  ngOnDestroy(){
    this.getProducts.unsubscribe();
    this.porductUpdateSubscription.unsubscribe();
  }

}

