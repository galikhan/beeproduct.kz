import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router
    ) { }
  product = { id: null, title: null, price: 0, description: null };

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.productId) {
        this.service.findById(param.productId).subscribe(result => {
          this.product = result;
        });
      }
    });
  }

  upsert(): void {
    if (this.product.id) {
      this.service.update(this.product).subscribe((r) => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.service.create(this.product).subscribe((r) => {
        console.log(r);
        this.router.navigate(['/admin/products']);
      });
    }
  }

}
