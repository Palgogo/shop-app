import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  login( User ){
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPasswords?key=${environment.apiKey}`, User,{
      headers: {'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'} 
    })
  }
}
