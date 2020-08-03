import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    let  booleanVal = (token) ? true : false
    console.log(booleanVal, 'booleanVall')
    return booleanVal;
  }
}
