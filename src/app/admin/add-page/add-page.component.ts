import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null,Validators.required),
      tytle: new FormControl(null,Validators.required),
      photo: new FormControl(null,Validators.required),
      info: new FormControl(null,Validators.required),
      price: new FormControl(null,Validators.required),
    })
  }

  submitted = false

  submit(){

  }

}
