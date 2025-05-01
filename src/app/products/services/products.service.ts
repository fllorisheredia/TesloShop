

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl

interface Options{
  limit?: number;
  offset?: number;
  gender?: string;
}


@Injectable({providedIn: 'root'})
export class ProductService {



  private _http =inject(HttpClient);



  getProducts(options: Options): Observable<ProductsResponse> {


    const{ limit =9, offset=0, gender=''} = options;



    return this._http.get<ProductsResponse>
    (`${baseUrl}/products`, {
      params:{
        limit,
        offset,
        gender,
      },
    })
    .pipe(tap((resp) => console.log(resp)));

  }


  getProductbyIdSlug(idSlug: string): Observable<Product> {

    return this._http.get<Product>(`${baseUrl}/products/${idSlug}`);


  }

}
