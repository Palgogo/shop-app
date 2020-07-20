import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  product: Product
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap(params => {
        return this.productService.getById(params['id'])
      })
    ).subscribe( product => {
      this.product = product
      this.form = new FormGroup({
      type: new FormControl(this.product.type,Validators.required),
      title: new FormControl(this.product.title,Validators.required),
      photo: new FormControl(this.product.photo,Validators.required),
      info: new FormControl(this.product.info,Validators.required),
      price: new FormControl(this.product.price,Validators.required),
      })
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }


    this.productService.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    }).subscribe(res =>{
      this.router.navigate(['/admin','dashboard'])
    })
  }

}
