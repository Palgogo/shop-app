import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = []
  productName
  productSub: Subscription
  removeSub: Subscription

  constructor(
    private productService : ProductService
  ) { }

  ngOnInit() {
   this.productSub = this.productService.getAll().subscribe(products => {
     console.log(products)
      this.products = products
    })
  }

  ngOnDestroy(){
    if (this.productSub) {
      this.productSub.unsubscribe()
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }

  remove(id){
    this.removeSub = this.productService.remove(id)
    .subscribe( () => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
