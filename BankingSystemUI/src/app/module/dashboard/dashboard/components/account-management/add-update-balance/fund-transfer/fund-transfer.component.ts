import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { AddUpdateBalanceService } from '../../add-update-balance.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {
  FromSelectedAccountNo?: any;
  FromAccountNoList: any[] = [];
  ToAccountNoList: any[] = [];
  accountInfo: any;

  frm: FormGroup;
  isSubmited: boolean = false;

  transactionTypeList: any[] = [
    //"Cr",
    "Dr",
  ];

  toSelectedAccountNo?: any;
  IsAdmin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private addUpdateBalanceService: AddUpdateBalanceService,
    private commonService: CommonService,
    private toastService: ToastService
  ) {
    this.IsAdmin = addUpdateBalanceService.IsAdmin();
    this.frm = this.bindForm();
  }

  UserID: string = ''
  ngOnInit(): void {
    this.GetAllAccountNo();
    // const userID = localStorage.getItem(AppConstants.UserID);
    // if (userID) {
    //   this.UserID = userID;
    //   this.frm.get('userId')?.patchValue(this.UserID);
    // }

    this.ddlFromOnChange();
  }

  ddlFromOnChange() {
    this.ToAccountNoList = this.FromAccountNoList.filter(item => item?.id != this.FromSelectedAccountNo?.id);

    if (this.FromSelectedAccountNo && this.FromSelectedAccountNo.id) {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.enable();
      })
      this.frm.get('fromAccount')?.patchValue(this.FromSelectedAccountNo.accountNo);
      this.onIsChequeTransactionChange();
      this.AccountBalanceResponse();
    } else {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.disable();
      })
    }
  }

  bindForm() {
    return this.frm = this.formBuilder.group({
      "fromAccount": ['', Validators.required],
      "toAccount": ['', Validators.required],
      // "userId": ['', Validators.required],
      "amount": ['', Validators.required],
      "description": ['', Validators.required]
    });
  }

  GetAllAccountNo() {
    this.addUpdateBalanceService.GetAllAccountNo().subscribe((res: any) => {
      this.FromAccountNoList = res.map((item: any) => {
        item["ddlName"] = `${item.fullName} (${item.accountNo})`
        return item;
      });

      if (!this.IsAdmin) {
        const userID = localStorage.getItem(AppConstants.UserID);
        this.FromSelectedAccountNo = this.FromAccountNoList.find(f => f.id == userID);
        this.ddlFromOnChange();
      }
    })
  }

  ddlToOnChange() {

    this.frm.get('toAccount')?.patchValue(this.toSelectedAccountNo.accountNo);
  }

  onSubmit(): any {
    this.isSubmited = true;
    if (!this.frm.valid) {
      return false;
    }
    const amount = this.frm.get('amount')?.value;
    if (this.accountBanlace && amount && +amount > this.accountBanlace) {
      this.toastService.Error("Withdrawal amount should be less than balance");
      return false;
    }
    //this.frm.get('transactionType')?.patchValue('Dr');
    this.addUpdateBalanceService.FundTransfer({ ...this.frm.value }).subscribe((res: any) => {
      if (res && res.successs) {
        this.toastService.Success(res.message);
        this.FromSelectedAccountNo = null;
        this.frm.reset();
        // this.frm.get('userId')?.patchValue(this.UserID);
        this.frm.get('transactionType')?.patchValue('Dr');
        this.frm.get('isChequeTransaction')?.patchValue(false);
        this.accountBanlace = 0;
        this.fullName = '';
        this.onIsChequeTransactionChange()
        this.ddlFromOnChange();
        this.ToAccountNoList = [];
      } else {
        if (res.message)
          this.toastService.Error(res.message);
      }
    })
  }

  onIsChequeTransactionChange() {
    const isChequeTransaction = this.frm.get('isChequeTransaction')?.value;
    if (isChequeTransaction && isChequeTransaction == true) {
      this.frm.get('chequeAndRefNo')?.enable();
      this.frm.get('chequeAndRefNo')?.addValidators(Validators.required);
      this.frm.get('chequeAndRefNo')?.updateValueAndValidity();
    } else {
      this.frm.get('chequeAndRefNo')?.disable();
      this.frm.get('chequeAndRefNo')?.removeValidators(Validators.required);
      this.frm.get('chequeAndRefNo')?.updateValueAndValidity();

    }


    //this.frm.get('transactionType')?.disable();

  }

  isNumber(evt: any) {
    return this.commonService.CheckInputIsNumber(evt);
  }
  accountBanlace: number = 0;
  fullName: string = '';

  AccountBalanceResponse() {
    this.accountBanlace = 0;

    // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
    // this.frm.get('amount')?.updateValueAndValidity();

    if (this.FromSelectedAccountNo && this.FromSelectedAccountNo.accountNo) {
      this.addUpdateBalanceService.AccountBalanceResponse(this.FromSelectedAccountNo.accountNo).subscribe((res: any) => {
        if (res && res.newBalance) {
          this.accountBanlace = +res.newBalance;
          this.fullName = `${res.fullName} (Account No: ${this.FromSelectedAccountNo.accountNo})`
          // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
          // this.frm.get('amount')?.updateValueAndValidity();
        }
      })
    }
  }
}
