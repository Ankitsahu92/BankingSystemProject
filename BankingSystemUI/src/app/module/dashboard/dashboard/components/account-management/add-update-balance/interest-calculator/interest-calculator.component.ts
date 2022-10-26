import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { AddUpdateBalanceService } from '../../add-update-balance.service';
import * as moment from 'moment';

@Component({
  selector: 'app-interest-calculator',
  templateUrl: './interest-calculator.component.html',
  styleUrls: ['./interest-calculator.component.scss']
})
export class InterestCalculatorComponent implements OnInit {
  transactionList: any[] = [];
  interest: number = 4;
  disabled: boolean = true
  transaction: any;
  selectedAccountNo?: any;
  AccountNoList: any[] = [];
  accountInfo: any;
  maxDate: Date = new Date();
  frm: FormGroup;
  intCalFrm: FormGroup;
  isSubmited: boolean = false;

  transactionTypeList: any[] = [
    //"Cr",
    "Dr",
  ];
  isSearched: boolean = false;
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
    this.intCalFrm = this.bindInterestCalculator();
    // this.intCalFrm.get('amount')?.disable();
    // this.intCalFrm.get('newBalance')?.disable();
  }
  UserID: string = ''
  ngOnInit(): void {
    this.GetAllAccountNo();
    this.ddlOnChange();
  }

  bindForm() {
    return this.formBuilder.group({
      "accountNo": ['', Validators.required],
      "userId": ['', Validators.required],
      "fromDate": ['', Validators.required],
      "toDate": ['', Validators.required],
    });
  }

  bindInterestCalculator() {
    return this.formBuilder.group({
      "amount": ['', Validators.required],
      "interestRate": [this.interest, [Validators.required, Validators.min(0), Validators.max(100)]],
      "newBalance": ['', Validators.required],
      "isActive": [true, Validators.required],
      "description": ['', Validators.required],
      "oldBalance": ['', Validators.required],
      "transactionDate": [new Date(), Validators.required],
      "userId": ['', Validators.required],
      "transactionType": ['Cr', Validators.required],
      "chequeAndRefNo": [''],
      'total': [0]
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
    this.transaction = null;
    if (this.selectedAccountNo && this.selectedAccountNo.id) {
      Object.keys(this.frm.controls).map(control => {
        this.frm.get(control)?.enable();
      })
      this.frm.get('userId')?.patchValue(this.selectedAccountNo.id);
      this.frm.get('accountNo')?.patchValue(this.selectedAccountNo?.accountNo);
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

  GetTransactionByAccountNoAndDate() {
    this.addUpdateBalanceService.GetTransactionByAccountNoAndDate(this.frm.value)
      .subscribe((res: any) => {
        if (res && res.successs) {
          if (res.data.length > 0) {
            this.transactionList = res.data;
            this.transaction = res.data[res.data.length - 1];
            console.log(this.transaction, " this.transaction");
            if (this.transaction) {
              this.isSearched = true;
              this.intCalFrm.get('amount')?.patchValue(0);
              this.intCalFrm.get('newBalance')?.patchValue(this.transaction.newBalance.toFixed(2));
              this.intCalFrm.get('isActive')?.patchValue(true);
              this.intCalFrm.get('description')?.patchValue(`Interest from ${moment(this.frm.get('fromDate')?.value).format('DD MMM, YYYY')} to ${moment(this.frm.get('toDate')?.value).format('DD MMM, YYYY')} `);
              this.intCalFrm.get('oldBalance')?.patchValue(this.transaction.newBalance.toFixed(2));
              this.intCalFrm.get('transactionDate')?.patchValue(this.transaction.transactionDate);
              this.intCalFrm.get('userId')?.patchValue(this.transaction.userId);
              this.intCalFrm.get('transactionType')?.patchValue('Cr');
              this.intCalFrm.get('interestRate')?.patchValue(this.interest);
              this.onInterestRatechanges();
            }
          }
        }
      })
  }

  onInterestRatechanges() {
    const amount = this.intCalFrm.get('oldBalance')?.value;
    if (amount && +amount > 0) {
      const interestRate = this.intCalFrm.get('interestRate')?.value
      if (interestRate && +interestRate > 0) {
        const per = this.percentage(+interestRate, +amount)
        this.intCalFrm.get('amount')?.patchValue(per.toFixed(2));
        this.intCalFrm.get('newBalance')?.patchValue((+amount + per).toFixed(2));

      }
    }
  }

  isSubmitedInt: boolean = false;

  onIntSubmit(): any {
    if (!this.intCalFrm.valid) {
      console.log(this.intCalFrm, "this.intCalFrm");
      return
    }
    const data = this.intCalFrm.value;
    console.log(data, "data");
    this.addUpdateBalanceService.UpdateInterest(data)
      .subscribe((res: any) => {
        if (res && res.successs) {
          this.toastService.Success(res.message);
          this.intCalFrm.reset();
          this.frm.reset();
          this.selectedAccountNo = null;
          this.isSearched = false;
          this.isSubmited = false;
          this.transactionList = [];
        } else {
          this.toastService.Error(res.message);
        }
      })

  }

  percentage(partialValue: number, totalValue: number) {
    return (totalValue * partialValue) / 100;
  }

  calculateInterest(total: number, year: number, rate: number) {
    var interest = rate / 100 + 1;
    return parseFloat((total * Math.pow(interest, year)).toFixed(4));
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
