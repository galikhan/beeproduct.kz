import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/product/all');
  }

  findById(productId: number): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/private/product/' + productId);
  }

  create(product): Observable<any> {
    return this.http.post(environment.apiFullUrl + '/private/product/', product);
  }

  update(product): Observable<any> {
    return this.http.put(environment.apiFullUrl + '/private/product/', product);
  }

  delete(productId): Observable<any> {
    return this.http.delete(environment.apiFullUrl + '/private/product/' + productId);
  }

}
