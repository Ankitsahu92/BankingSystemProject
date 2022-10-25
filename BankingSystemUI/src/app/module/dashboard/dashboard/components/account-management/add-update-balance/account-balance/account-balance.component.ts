import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { AddUpdateBalanceService } from '../../add-update-balance.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
  transactionList: any[] = [];
  selectedAccountNo?: any;
  AccountNoList: any[] = [];
  accountInfo: any;

  frm: FormGroup;
  isSubmited: boolean = false;

  transactionTypeList: any[] = [
    //"Cr",
    "Dr",
  ];

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

    this.ddlOnChange();
  }

  bindForm() {
    return this.frm = this.formBuilder.group({
      "accountNo": ['', Validators.required],
      "userId": ['', Validators.required],
      "fromDate": ['', Validators.required],
      "toDate": ['', Validators.required],
    });
  }

  GetAllAccountNo() {
    this.addUpdateBalanceService.GetAllAccountNo().subscribe((res: any) => {
      this.AccountNoList = res.map((item: any) => {
        item["ddlName"] = `${item.fullName} (${item.accountNo})`
        return item;
      });

      if (!this.IsAdmin) {
        const userID = localStorage.getItem(AppConstants.UserID);
        this.selectedAccountNo = this.AccountNoList.find(f => f.id == userID);
      }
    })
  }

  ddlOnChange() {
    this.transactionList = [];
    if (this.selectedAccountNo && this.selectedAccountNo.id) {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.enable();
      })
      this.frm.get('userId')?.patchValue(this.selectedAccountNo.id);
      this.frm.get('accountNo')?.patchValue(this.selectedAccountNo?.accountNo);
      this.AccountBalanceResponse();
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
    this.GetTransactionByAccountNoAndDate();
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

    if (this.selectedAccountNo && this.selectedAccountNo.accountNo) {
      this.addUpdateBalanceService.AccountBalanceResponse(this.selectedAccountNo.accountNo).subscribe((res: any) => {
        if (res && res.newBalance) {
          this.accountBanlace = +res.newBalance;
          this.fullName = `${res.fullName} (Account No: ${this.selectedAccountNo.accountNo})`
          // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
          // this.frm.get('amount')?.updateValueAndValidity();
        }
      })
    }
  }

  SearchTop10Transaction() {
    this.addUpdateBalanceService.GetTop10TransactionByAccountNo(this.selectedAccountNo.accountNo).subscribe((res: any) => {
      if (res && res.successs) {
        this.transactionList = res.data

        /**
         * amount
        : 
        50
        chequeAndRefNo
        : 
        "Fund Transfer Form 123456789 To 023456789"
        createdBy
        : 
        1
        createdByIP
        : 
        "45.118.157.222"
        createdOn
        : 
        "2022-10-25T13:35:38.394327"
        description
        : 
        "50 trf"
        id
        : 
        3
        isActive
        : 
        true
        isChequeTransaction
        : 
        false
        modifiedBy
        : 
        null
        modifiedByIP
        : 
        null
        modifiedOn
        : 
        null
        newBalance
        : 
        850
        oldBalance
        : 
        900
       
       
        userId
        : 
        2
         */

      }
    })
  }

  GetTransactionByAccountNoAndDate() {
    this.addUpdateBalanceService.GetTransactionByAccountNoAndDate(this.frm.value).subscribe((res: any) => {
      if (res && res.successs) {
        this.transactionList = res.data

        // this.frm.get('amount')?.addValidators(Validators.max(this.accountBanlace));
        // this.frm.get('amount')?.updateValueAndValidity();
      }
    })
  }

  //table 
  first = 0;
  rows = 10;
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.transactionList ? this.first === (this.transactionList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.transactionList ? this.first === 0 : true;
  }
  //table End

}
