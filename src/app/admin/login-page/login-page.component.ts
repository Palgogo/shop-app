import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup

  constructor(
    public auth: AuthService
  ) { }

  submited = false
  submit() {
    if (this.form.invalid){
      return;
    }

    this.submited = true

    const user = {
      //email: this.form.value.email,
      //password: this.form.value.password,
    }

    this.auth.login(user).subscribe(res => {
      console.log(res)
    }, () => {
      this.submited = false
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

}
