import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private service: OrderService,
    private route: ActivatedRoute) { }
  orders = [];
  pageCount = 0;
  pages = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(qp => {
      let page = 1;
      if (qp.page) {
        page = qp.page;
      }
      this.service.getAll(page).subscribe(result => {
        this.orders = result;
      });
    });

    this.service.getCount().subscribe(result => {
      this.pageCount = Math.ceil(result / 25);
      for (let page = 1; page <= this.pageCount; page++) {
        this.pages.push(page);
      }
    });

  }

  countTotalPrice(products: any): number {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price * product.amount;
    }
    return totalPrice;
  }

}
