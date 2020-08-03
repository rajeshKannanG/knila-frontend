import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    const role = localStorage.getItem('role');
    const url = window.location.href.indexOf('appointment')
    console.log(this.router.url,window.location.href, 'routerrrrr')
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }else if(this.auth.isAuthenticated() && url > 0 && (role !== 'patient')){
      return false;
    }
    return true;
  }
}
