import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frm: FormGroup;
  isSubmited: boolean = false;
  logBtm: boolean = false;
  logMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
    this.frm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  get lgFrm() { return this.frm.controls; }

  logOnSubmit(): void {
    this.isSubmited = true;
    this.logBtm = true;
    if (this.frm.invalid) {
      this.logBtm = false;
      return;
    } else {
      let formObj = this.frm.getRawValue();
      // this.fetch.logTUsr(formObj).subscribe(
      //   res => {
      //     const data: any = res;
      //     this.auth.sendUsrToken(data.token, data.usrName);
      //     this.logMsg = { msg: "Login successfully!", alert: 'alert-success' };
      //     this.frm.reset();
      //     this.logBtm = false;
      //     setTimeout(() => {
      //       this.route.navigate(["/user/order/all"]);
      //     }, 1500);
      //   },
      //   err => {
      //     this.logBtm = false;
      //     this.logMsg = { msg: err.error, alert: 'alert-danger' };
      //   }
      // );
    }
    this.isSubmited = false;
  }
}
