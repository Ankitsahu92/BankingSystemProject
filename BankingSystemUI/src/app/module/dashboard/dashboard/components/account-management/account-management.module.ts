import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AddUpdateBalanceComponent } from './add-update-balance/add-update-balance.component';
import { ShareModule } from 'src/app/share/share.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { DepositComponent } from './add-update-balance/deposit/deposit.component';
import { WithdrawComponent } from './add-update-balance/withdraw/withdraw.component';
import { FundTransferComponent } from './add-update-balance/fund-transfer/fund-transfer.component';
import { AccountSummaryComponent } from './add-update-balance/account-summary/account-summary.component';
import { AccountBalanceComponent } from './add-update-balance/account-balance/account-balance.component';
import { InterestCalculatorComponent } from './add-update-balance/interest-calculator/interest-calculator.component';

@NgModule({
  declarations: [
    AddUpdateBalanceComponent,
    DepositComponent,
    WithdrawComponent,
    FundTransferComponent,
    AccountSummaryComponent,
    AccountBalanceComponent,
    InterestCalculatorComponent
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    ShareModule,
    TabsModule.forRoot()
  ]
})
export class AccountManagementModule { }
