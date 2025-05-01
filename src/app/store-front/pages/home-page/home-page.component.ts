// import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { ProductService } from '@products/services/products.service';
import { Observable } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

// import { Observable } from 'rxjs';
// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

   private _productsService = inject(ProductService);

   productsResource = rxResource({
    request: ()=>({}),
    loader: ({request})=>{
      return this._productsService.getProducts({});
    }
   })





}

