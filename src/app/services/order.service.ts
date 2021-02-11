import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  initCookie(): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/cookie');
  }

  // createOrder(): Observable<any> {
  //   return this.http.post(environment.apiFullUrl + '/order', { 'demo': 'cookie' });
  // }

  addToCart(productId): Observable<any> {
    return this.http.post(environment.apiFullUrl + '/order/product', { productId: productId });
  }

  removeFromCart(productId): Observable<any> {
    return this.http.delete(environment.apiFullUrl + '/order/product/' + productId);
  }

  updateProductAmount(productId, amount): Observable<any> {
    return this.http.put(environment.apiFullUrl + '/order/product/' + productId, { amount: amount });
  }

  findOrderBySession(): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/order');
  }

  startOrder(address): Observable<any> {
    return this.http.post(environment.apiFullUrl + '/order/started', address);
  }

  getAll(page: number): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/private/order/all?page=' + page);
  }

  getCount(): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/private/order/count');
  }
}
