import { Component} from '@angular/core';
import { product } from './Modals/interfaces';
import { products } from '../assets/mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'my-store';
  productsList: product[] = [];
  productSelected: product = null;


  constructor(){
    this.productsList = products.slice(0, 4);
  }

  productSelection(productId:number){
    this.productSelected = this.productsList[productId];
  }

  productUpdate(event: product){
    const productIndex= this.productsList.findIndex(product => product.id === event.id);
    this.productsList[productIndex] = event;
    this.productSelected = event;
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