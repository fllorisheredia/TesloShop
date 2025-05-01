import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({gender})=>gender)));


  private _productsService = inject(ProductService);

  productsResource = rxResource({
   request: ()=>({gender: this.gender()}),
   loader: ({request})=>{
     return this._productsService.getProducts({
      gender: request.gender,

     });
   }
  })


 }
