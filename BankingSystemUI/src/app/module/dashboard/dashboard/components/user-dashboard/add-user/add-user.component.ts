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
        this.frm.get('id')?.patchValue(this.id);
        this.frm.get('accounType')?.patchValue('-1');
        this.frm.get('isActive')?.patchValue(true);
        this.frm.get('isAdmin')?.patchValue(false);
      }
    })

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


    /*
    {
  "createdBy": 0,
  "createdOn": "2022-10-21T14:07:40.438Z",
  "createdByIP": "string",
  "modifiedBy": 0,
  "modifiedOn": "2022-10-21T14:07:40.438Z",
  "modifiedByIP": "string",
  "isActive": true,
  
}
    */
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


  isNumber(evt: any) {
    return this.commonService.CheckInputIsNumber(evt);
  }
}
