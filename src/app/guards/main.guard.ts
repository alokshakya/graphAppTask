import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  isLoggedIn:boolean=false;
  constructor(private auth:AuthService, private router:Router){
    this.auth.isLoggedIn().subscribe( val => {
      this.isLoggedIn = val;
    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.isLoggedIn){
      this.router.navigateByUrl('login');
      return false;
    }
      return true;
  }
  
}
