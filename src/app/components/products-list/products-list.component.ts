import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { productInterface } from '../../Modals/interfaces';
import { ProductsService} from '../../products-service.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  getProducts: Subscription;
  productsList: productInterface[] = [];
  porductUpdateSubscription: Subscription;
  productSelectedId: number;
  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, private ProductsServiceService: ProductsService){}

  ngOnInit(){
      this.route.firstChild.params.subscribe(
          (params: Params) => {
            this.productSelectedId = Number(params.id);
      }
    )
    this.porductUpdateSubscription = this.ProductsServiceService.updateList
    .subscribe(
      (productsList: productInterface[]) => {
        this.productsList = productsList;
      }
    );
    this.isMobile = window.innerWidth <= 670;
    this.getProductsList();
  }

  getProductsList(): void {
    this.getProducts = this.ProductsServiceService.getProductsList(4)
    .subscribe(products => this.productsList  = products);
  }

  sortProducts(sortBy: string){
    this.ProductsServiceService.sortList(sortBy);
  }

  filterListHandler(value: string){
    this.ProductsServiceService.filterList(value);
  }

  // setSelected(productId:number){
  //   this.productSelectedId = productId;
  // }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
    this.isMobile = window.innerWidth <= 670;
  }

  ngOnDestroy(){
    this.getProducts.unsubscribe();
    this.porductUpdateSubscription.unsubscribe();
  }

}

