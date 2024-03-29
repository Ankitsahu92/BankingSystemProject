import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppConstants } from '../../constant/constant';
import { AuthService } from '../../services';

@Component({
  selector: 'app-nan-bar',
  templateUrl: './nan-bar.component.html',
  styleUrls: ['./nan-bar.component.scss']
})
export class NanBarComponent implements OnInit {
  UserName: string = ''
  IsAdmin: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.UserName = `${this.authService.getlocalStorageValue(AppConstants.FirstName)} ${this.authService.getlocalStorageValue(AppConstants.LastName)}`;
    const isAdmin = this.authService.getlocalStorageValue(AppConstants.IsAdmin);
    if (isAdmin) {
      this.IsAdmin = isAdmin == 'true';
    }
  }

  logOut() {
    this.authService.clearlocalStorageValue();
    this.router.navigate(['/login'])
  }

  HomeClick() {
    if (this.IsAdmin) {
      this.router.navigate(["dashboard", "admin"]);
    }
    else {
      this.router.navigate(["dashboard", "account"]);
    }
  }

}
