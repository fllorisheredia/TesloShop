import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { map } from 'rxjs';
// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
// import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({gender})=>gender)));
  PaginationService = inject(PaginationService);


  private _productsService = inject(ProductService);

  productsResource = rxResource({
   request: ()=>({gender: this.gender(), page: this.PaginationService.courrentPage()-1}),
   loader: ({request})=>{
     return this._productsService.getProducts({
      gender: request.gender,
      offset: request.page * 9,

     });
   }
  })


 }
