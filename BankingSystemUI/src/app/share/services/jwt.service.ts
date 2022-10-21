import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../constant/constant';
import jwt_decode from "jwt-decode";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private router: Router, private authService: AuthService) { }

  getTokenInfo(): any {
    const token = this.authService.getlocalStorageValue(AppConstants.Token);
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded) {
        return decoded as any
      }
    }
    localStorage.removeItem(AppConstants.Token);
    this.router.navigate(['/login']);
  }
}
