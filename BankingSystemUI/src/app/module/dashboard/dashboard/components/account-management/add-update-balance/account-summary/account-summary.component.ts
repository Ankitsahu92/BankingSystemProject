import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUpdateBalanceService } from '../../add-update-balance.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {
  selectedAccountNo?: any;
  AccountNoList: any[] = [];
  accountInfo: any;

  frm: FormGroup;
  isSubmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private addUpdateBalanceService: AddUpdateBalanceService
  ) {
    this.frm = this.bindForm();

    this.frm.get('fullName')?.disable();
    this.frm.get('userName')?.disable();
    this.frm.get('accountNo')?.disable();
    this.frm.get('accountType')?.disable();
    this.frm.get('newBalance')?.disable();
  }

  ngOnInit(): void {
    this.GetAllAccountNo();
  }

  bindForm() {
    return this.frm = this.formBuilder.group({
      "id": [''],
      "userId": [''],
      "amount": [''],
      "oldBalance": [''],
      "newBalance": [''],
      "description": [''],
      "transactionType": [''],
      "isChequeTransaction": [''],
      "chequeAndRefNo": [''],
      "transactionDate": [''],
      "firstName": [''],
      "lastName": [''],
      "userName": [''],
      "accountNo": [''],
      "accountType": [''],
      "fullName": [''],
    });
  }

  GetAllAccountNo() {
    this.addUpdateBalanceService.GetAllAccountNo().subscribe((res: any) => {
      console.log("GetAllAccountNo", res);
      this.AccountNoList = res.map((item: any) => {
        item["ddlName"] = `${item.fullName} (${item.accountNo})`
        return item;
      });
    })
  }

  AccountBalanceResponse() {
    if (this.selectedAccountNo && this.selectedAccountNo.accountNo) {
      this.addUpdateBalanceService.AccountBalanceResponse(this.selectedAccountNo.accountNo).subscribe((res: any) => {
        console.log("AccountBalanceResponse", res);
        this.accountInfo = res;
        this.frm.setValue(this.accountInfo);

        this.frm.get('fullName')?.disable();
        this.frm.get('userName')?.disable();
        this.frm.get('accountNo')?.disable();
        this.frm.get('accountType')?.disable();
        this.frm.get('newBalance')?.disable();
      })
    }
  }

  ddlOnChange() {
    this.AccountBalanceResponse();
  }

  onSubmit() {

  }
}
