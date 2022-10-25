import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { AuthService } from 'src/app/share/services';
import { ToastService } from 'src/app/share/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frm: FormGroup;
  isSubmited: boolean = false;
  logMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    localStorage.clear();
    this.frm = this.formBuilder.group({
      username: ['8978786933', Validators.required],
      password: ['System@1234', Validators.required]
    });
  }

  ngOnInit() {
  }

  get lgFrm() { return this.frm.controls; }

  logOnSubmit(): void {
    this.isSubmited = true;
    if (!this.frm.valid) {
      return;
    } else {
      let formObj = this.frm.getRawValue();
      this.authService.login(formObj).subscribe(
        (res: any) => {
          this.toastService.Success('Login Successfully !!!')
          localStorage.setItem(AppConstants.FirstName, res.firstName);
          localStorage.setItem(AppConstants.LastName, res.lastName);
          localStorage.setItem(AppConstants.UserName, res.userName);
          localStorage.setItem(AppConstants.Token, res.token);
          localStorage.setItem(AppConstants.IsAdmin, res.isAdmin);
          localStorage.setItem(AppConstants.UserID, res.id);
          this.frm.reset();
          this.route.navigate(["dashboard", "home"]);
        },
        (err: any) => {
          // this.logMsg = { msg: err.error, alert: 'alert-danger' };
        }
      );
    }
    this.isSubmited = false;
  }
}
