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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.UserName = `${this.authService.getlocalStorageValue(AppConstants.FirstName)} ${this.authService.getlocalStorageValue(AppConstants.LastName)}`;

    // localStorage.getItem(AppConstants.FirstName);
    // localStorage.getItem(AppConstants.LastName);
    // localStorage.getItem(AppConstants.UserName);
    // localStorage.getItem(AppConstants.Token);
    // localStorage.getItem(AppConstants.IsAdmin);
  }

  logOut() {
    this.authService.clearlocalStorageValue();
    this.router.navigate(['/login'])
  }

}
