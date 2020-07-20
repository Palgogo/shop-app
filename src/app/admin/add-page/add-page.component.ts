import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null,Validators.required),
      title: new FormControl(null,Validators.required),
      photo: new FormControl(null,Validators.required),
      info: new FormControl(null,Validators.required),
      price: new FormControl(null,Validators.required),
    })
  }

  submitted = false

  submit(){
    if(this.form.invalid){
      return
    }

    this.submitted = true

    const product ={
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    }

    (this.form)
    this.productService.create(product).subscribe(res =>{
      this.submitted = false
      this.form.reset()
      this.router.navigate(['/'])
    })
  }

}
