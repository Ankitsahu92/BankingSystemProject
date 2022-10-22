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
  accountType: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private commonService: CommonService,
    private toastService: ToastService
  ) {
    this.frm = this.bindForm();

    this.accountType = commonService.getAccountType();

    this.activatedRoute.params.subscribe((params: any) => {
      if (params?.id) {
        this.id = +params?.id;
        this.GetUsersByID(this.id);


        // this.frm.get('id')?.patchValue(this.id);
        // this.frm.get('accounType')?.patchValue('-1');
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
      accounNo: ['', Validators.required],
      accounType: ['-1', Validators.required],
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
    const msg = `User ${this.id == 0 ? 'added' : 'updated'} successfully!!!`
    this.isSubmited = true;
    if (this.frm.invalid)
      return false;
    this.userService.AddOrUpdateUsers(this.frm.value).subscribe((res: any) => {
      console.log(res, "AddOrUpdateUsers");
      if (res) {
        this.toastService.Success(msg);
      }
    })
  }

  GetUsersByID(id: number): any {
    this.userService.GetUsersByID(id).subscribe((res: any) => {
      console.log(res, "GetUsersByID");
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
      this.frm.get('accounNo')?.removeValidators(Validators.required);
      this.frm.get('accounNo')?.updateValueAndValidity();
      this.frm.get('accounNo')?.setValue(null);
      this.frm.get('accounNo')?.disable();

      this.frm.get('accounType')?.removeValidators(Validators.required);
      this.frm.get('accounType')?.updateValueAndValidity();
      this.frm.get('accounType')?.setValue(-1);
      this.frm.get('accounType')?.disable();
    } else {
      this.frm.get('accounNo')?.addValidators(Validators.required);
      this.frm.get('accounNo')?.updateValueAndValidity();
      this.frm.get('accounType')?.addValidators(Validators.required);
      this.frm.get('accounType')?.updateValueAndValidity();
    }

    if (this.id != 0) {
      this.frm.get('password')?.removeValidators(Validators.required);
      this.frm.get('password')?.updateValueAndValidity();
    }
  }
}
