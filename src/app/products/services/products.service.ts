import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { ProductsResponse, Product } from '../interfaces/product.interface';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _http = inject(HttpClient);

  private _productsCache = new Map<string, ProductsResponse>(); // Cache para guardar los productos que ya se han traido de la BD
  private _productCache = new Map<string, Product>(); // Se guarda el cache de un producto en especifico
  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`; // Cache key 9-0-''

    if (this._productsCache.has(key)) {
      return of(this._productsCache.get(key)!);
    }

    return this._http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this._productsCache.set(key, resp)) // se mandas los valores de la respuesta, se guardan en el cache
      );
  }

  getProductbyIdSlug(idSlug: string): Observable<Product> {

    if(this._productCache.has(idSlug)){
      return of(this._productCache.get(idSlug)!)// Se obtiene el producto del cache
    }





//Se devuelve el producto por us ID/Slug
    return this._http.get<Product>(`${baseUrl}/products/${idSlug}`).
    pipe(
      delay(2000), //tiempo de espera
      tap((product)=> this._productCache.set(idSlug, product)), // Se guarda el producto en el cache
    )
  }
}
