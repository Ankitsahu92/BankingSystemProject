import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { AddUpdateBalanceService } from '../../add-update-balance.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  selectedAccountNo?: any;
  AccountNoList: any[] = [];
  accountInfo: any;

  frm: FormGroup;
  isSubmited: boolean = false;

  transactionTypeList: any[] = [
    //"Cr",
    "Dr",
  ];


  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private addUpdateBalanceService: AddUpdateBalanceService,
    private commonService: CommonService,
    private toastService: ToastService
  ) {
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

    this.ddlOnChange();
  }

  bindForm() {
    return this.frm = this.formBuilder.group({
      "userId": ['', Validators.required],
      "amount": ['', Validators.required],
      "description": ['', Validators.required],
      "transactionType": ['Dr', Validators.required],
      "isChequeTransaction": [false],
      "chequeAndRefNo": [''],
      "transactionDate": ['', Validators.required],
    });
  }

  GetAllAccountNo() {
    this.addUpdateBalanceService.GetAllAccountNo().subscribe((res: any) => {
      this.AccountNoList = res.map((item: any) => {
        item["ddlName"] = `${item.fullName} (${item.accountNo})`
        return item;
      });
    })
  }

  ddlOnChange() {
    if (this.selectedAccountNo && this.selectedAccountNo.id) {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.enable();
      })
      this.frm.get('userId')?.patchValue(this.selectedAccountNo.id);
      this.onIsChequeTransactionChange();
      this.AccountBalanceResponse();

      if (this.makeCheckbookRequest) {
        this.frm.get('isChequeTransaction')?.disable();
      }

    } else {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.disable();
      })
    }

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
    this.addUpdateBalanceService.AddAndSubtractBalances(this.frm.value).subscribe((res: any) => {
      if (res) {
        this.toastService.Success("Operation Complete Successfully!!!");
        this.selectedAccountNo = null;
        this.frm.reset();
        // this.frm.get('userId')?.patchValue(this.UserID);
        this.frm.get('transactionType')?.patchValue('Dr');
        this.frm.get('isChequeTransaction')?.patchValue(false);
        this.accountBanlace = 0;
        this.fullName = '';
        this.onIsChequeTransactionChange()
        this.ddlOnChange();
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
  makeCheckbookRequest: boolean = false;
  AccountBalanceResponse() {
    this.accountBanlace = 0;

    // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
    // this.frm.get('amount')?.updateValueAndValidity();

    if (this.selectedAccountNo && this.selectedAccountNo.accountNo) {
      this.addUpdateBalanceService.AccountBalanceResponse(this.selectedAccountNo.accountNo).subscribe((res: any) => {
        if (res && res.newBalance) {
          this.accountBanlace = +res.newBalance;
          this.fullName = `${res.fullName} (Account No: ${this.selectedAccountNo.accountNo})`
          // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
          // this.frm.get('amount')?.updateValueAndValidity();
          this.makeCheckbookRequest = res.makeCheckbookRequest;
        }
      })
    }
  }
}
