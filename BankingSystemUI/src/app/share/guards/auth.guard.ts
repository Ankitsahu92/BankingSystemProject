import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../constant/constant';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isvalid: boolean = false;
    const token = localStorage.getItem(AppConstants.Token);

    if (token) {
      const decoded = jwt_decode(token) as any;
      isvalid = (new Date(0).setUTCSeconds(decoded ? decoded['exp'] : 0)).valueOf() > (new Date(0)).valueOf();
    }

    if (!isvalid) {
      this.router.navigate(['/login']);
    }
    return isvalid;
  }

}
