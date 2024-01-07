import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';
// const STORE_BASE_URL = 'https://dummyjson.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'asc',
    category?: string
  ): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }




  getProductsByName(name: string): Observable<Array<Product>> {

    console.log(name)
    const lista= this.httpClient.get<Array<Product>>(
        `${STORE_BASE_URL}/products`
    ).
    pipe(
        // Filter the products based on the provided name
        map(products => products.filter(product => product.title.toLowerCase().includes(name.toLowerCase())))
    );

    // lista.subscribe(elt=>{
    //
    //   console.log(elt)
    // })
    //
    return lista;
  }




  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
