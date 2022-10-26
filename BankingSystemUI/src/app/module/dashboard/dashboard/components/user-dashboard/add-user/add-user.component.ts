import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id: number = 0;
  frm: FormGroup;
  isSubmited: boolean = false;
  accountTypeList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private commonService: CommonService,
    private toastService: ToastService
  ) {
    this.frm = this.bindForm();

    this.accountTypeList = commonService.getAccountType();

    this.activatedRoute.params.subscribe((params: any) => {
      if (params?.id) {
        this.id = +params?.id;
        this.GetUsersByID(this.id);


        // this.frm.get('id')?.patchValue(this.id);
        // this.frm.get('accountType')?.patchValue('-1');
        // this.frm.get('isActive')?.patchValue(true);
        // this.frm.get('isAdmin')?.patchValue(false);
      }
    })

    this.onIsAdminChange();
  }

  bindForm() {
    return this.frm = this.formBuilder.group({
      id: [this.id],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      accountNo: ['', Validators.required],
      accountType: ['-1', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false, Validators.required],
      isActive: [true, Validators.required],
    });
  }

  resetForm() {
    this.frm.reset();
    this.frm.get('id')?.patchValue(this.id);
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.isSubmited = true;
    if (!this.frm.valid)
      return false;
    this.userService.AddOrUpdateUsers(this.frm.value).subscribe((res: any) => {
      if (res && res.successs) {
        this.toastService.Success(res.message);
        this.route.navigate(["dashboard", "user"]);
      } else {
        this.toastService.Error(res.message);
      }
    })
  }

  GetUsersByID(id: number): any {
    this.userService.GetUsersByID(id).subscribe((res: any) => {
      if (res) {
        this.frm.setValue(this.commonService.removeDefaultProperty(res));
        this.onIsAdminChange();
      }
    })
  }

  isNumber(evt: any) {
    return this.commonService.CheckInputIsNumber(evt);
  }

  onIsAdminChange() {
    const isAdmin = this.frm.get('isAdmin')?.value;
    if (isAdmin && isAdmin == true) {
      this.frm.get('accountNo')?.removeValidators(Validators.required);
      this.frm.get('accountNo')?.updateValueAndValidity();
      this.frm.get('accountNo')?.setValue(null);
      this.frm.get('accountNo')?.disable();

      this.frm.get('accountType')?.removeValidators(Validators.required);
      this.frm.get('accountType')?.updateValueAndValidity();
      this.frm.get('accountType')?.setValue(-1);
      this.frm.get('accountType')?.disable();

      this.frm.get('userName')?.addValidators(Validators.required);
      this.frm.get('userName')?.updateValueAndValidity();
      this.frm.get('userName')?.enable();

    } else {
      this.frm.get('accountNo')?.addValidators(Validators.required);
      this.frm.get('accountNo')?.updateValueAndValidity();
      this.frm.get('accountNo')?.enable();

      this.frm.get('accountType')?.addValidators(Validators.required);
      this.frm.get('accountType')?.updateValueAndValidity();
      this.frm.get('accountType')?.enable();

      this.frm.get('userName')?.removeValidators(Validators.required);
      this.frm.get('userName')?.updateValueAndValidity();
      this.frm.get('userName')?.setValue(null);
      this.frm.get('userName')?.disable();
    }

    if (this.id != 0) {
      this.frm.get('password')?.removeValidators(Validators.required);
      this.frm.get('password')?.updateValueAndValidity();
    }
  }
}
