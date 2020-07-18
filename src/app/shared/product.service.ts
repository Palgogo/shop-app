import { FbResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }

  create(product){
    return this.http.post(`${environment.fbDbUrl}/products.json`,product)
    .pipe(
      map( (res: FbResponse)  => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      })
    )
  }
}
