import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    products = [];

    constructor(
        private service: OrderService,
        private productSerice: ProductService
        ) { }

    ngOnInit() {
        this.productSerice.findAll().subscribe(result => {
            this.products = result;
        });
     }

    addToCart(productId): void {
        console.log('productId', productId);
        this.service.initCookie().subscribe(() => {
            this.service.addToCart(productId).subscribe(result => {
                console.log(result);
            });
        });
    }
}
