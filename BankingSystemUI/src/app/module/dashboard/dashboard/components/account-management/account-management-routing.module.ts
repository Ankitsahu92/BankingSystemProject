import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateBalanceComponent } from './add-update-balance/add-update-balance.component';

const routes: Routes = [
  {
    path: 'AddUpdateBalance',
    component: AddUpdateBalanceComponent
  },
  //  {
  //   path: 'add',
  //   component: AddUserComponent
  // }, {
  //   path: 'update/:id',
  //   component: AddUserComponent
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'AddUpdateBalance'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
