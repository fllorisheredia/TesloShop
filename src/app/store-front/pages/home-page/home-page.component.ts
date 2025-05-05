// import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
// import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

// import { Observable } from 'rxjs';
// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

   private _productsService = inject(ProductService);

   PaginationService = inject(PaginationService);






//    ActivatedRoute = inject(ActivatedRoute);


// // Este es el observable que nos va a ayudar a obtener los productos por pagina
//    courrentPage = toSignal(
//     this.ActivatedRoute.queryParamMap.pipe(

//       map(params=> (params.get('page') ? + params.get('page')! : 1 )),
//       map( page => (isNaN(page) ? 1 : page) ) // Este map es el quehace que si el usuario introduce un valor no numerico se le asigne el valor 1 que sera la apgina que s emostrara
//     ),

//     {
//       initialValue: 1, // valor inicial
//     }
//    );

   productsResource = rxResource({
    request: ()=>({page: this.PaginationService.courrentPage()-1}),
    loader: ({request})=>{
      return this._productsService.getProducts({
        offset: request.page * 9,

      });
    }
   })





}

