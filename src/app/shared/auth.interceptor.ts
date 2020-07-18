import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(this.auth.isAuthenticated()){
           req = req.clone({
               setParams: {
                   auth: this.auth.token
               }
           })
       }
       return next.handle(req)
       .pipe(
           catchError(error => {
               if (error.status ===401){
                   this.auth.logout()
                   this.router.navigate(['/admin/','login'])
               }
               return throwError(error)
           })
       )
    }


}