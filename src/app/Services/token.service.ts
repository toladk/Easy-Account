import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : environment.login,
    signup : environment.signup
  }

  constructor(
    private router: Router
  ) { }

  handle(token: any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token: string) {
    sessionStorage.setItem('token', token);
  }

  get() {
    return sessionStorage.getItem('token');
  }

  remove() {
    this.router.navigateByUrl('/login');
    sessionStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
      // return (payload.iss === 'http://localhost:8000/api/login') ? true : false; //easy hint
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false ;
      }
    }
    return false;
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}

