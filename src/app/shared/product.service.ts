import { FbResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ObjectUnsubscribedError } from 'rxjs';

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

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
    .pipe(
      map( res => {
        return Object.keys(res)
        .map( key => (
          {
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }
        ))
      })
    )
  }
}
