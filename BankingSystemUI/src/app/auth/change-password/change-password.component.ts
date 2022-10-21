import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { AuthService } from 'src/app/share/services';
import { ToastService } from 'src/app/share/services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  frm: FormGroup;
  isSubmited: boolean = false;
  logMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.frm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get lgFrm() { return this.frm.controls; }

  logOnSubmit(): void {
    this.isSubmited = true;
    if (this.frm.invalid) {
      return;
    } else {
      let formObj = this.frm.getRawValue();
      this.authService.changePassword({ "userID": +this.authService.getlocalStorageValue(AppConstants.UserID), "password": formObj.password }).subscribe(
        (res: any) => {
          if (res) {
            this.toastService.Success("Password Change Successfully!!!");
            this.authService.clearlocalStorageValue();
            this.frm.reset();
            this.route.navigate(["/login"]);
          }
        },
        (err: any) => {
          this.logMsg = { msg: err.error, alert: 'alert-danger' };
        }
      );
    }
    this.isSubmited = false;
  }
  isPasswordSame() {
    return this.frm.get('password')?.dirty && this.frm.get('confirmPassword')?.dirty
      && this.frm.get('password')?.value && this.frm.get('confirmPassword')?.value
      ? this.frm.get('password')?.value === this.frm.get('confirmPassword')?.value : true
  }

  disabledSavebtn() {
    return !(this.frm.valid && this.isPasswordSame())
  }
}
