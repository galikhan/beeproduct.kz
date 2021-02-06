import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

export interface Address {
  street: string;
  floor: number;
  entrance: number;
  flat: number;
  phone: string;
  customerName: string;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private service: OrderService,
    private router: Router) { }

  productInCart = [];
  //  = [
  //   { id: 1, title: 'Медовым мед', amount: 1, price: 3000, removed: false },
  //   { id: 2, title: 'Медо сахар', amount: 2, price: 4000, removed: false },
  // ];
  productPriceTotal = 0;
  deliveryPrice = 0;
  totalPrice = 0;

  address = {
    street: '',
    floor: null,
    entrance: null,
    flat: null,
    fullname: '',
    phone: ''
  };
  // address = Address();
  removed = false;

  ngOnInit(): void {

    this.service.initCookie().subscribe(() => {
      this.service.findOrderBySession().subscribe(result => {
        this.productInCart = result.products;
        this.calculateCart();
      });
    });
    this.calculateCart();
  }

  increment(amount): number {
    if (amount >= 1 && amount < 20) {
      return amount + 1;
    }
    return amount;
  }

  decrement(amount): number {
    if (amount >= 2 && amount < 20) {
      return amount - 1;
    }
    return amount;
  }

  remove(product): void {
    this.service.removeFromCart(product.id).subscribe(result => {
      this.removed = true;
    });
  }

  calculateProductPriceTotal(products): number {
    let price = 0;
    for (const product of products) {
      if (!product.removed) {
        price += product.amount * product.price;
      }
    }
    return price;
  }

  calculateDeliveryPrice(productTotalPrice): number {
    return productTotalPrice >= 10000 ? 0 : 600;
  }

  calculateCart(): void {
    this.productPriceTotal = this.calculateProductPriceTotal(this.productInCart);
    this.deliveryPrice = this.calculateDeliveryPrice(this.productPriceTotal);
    this.totalPrice = this.productPriceTotal + this.deliveryPrice;
  }

  startOrder(): void {
    this.service.startOrder(this.address).subscribe(result => {
        console.log('result', result);
        this.router.navigate(['/greeting']);
    });
  }

  updateProductAmount(productId, amount): void {
    this.service.updateProductAmount(productId, amount).subscribe(result => {
      console.log('result', result);
    });
  }
}
