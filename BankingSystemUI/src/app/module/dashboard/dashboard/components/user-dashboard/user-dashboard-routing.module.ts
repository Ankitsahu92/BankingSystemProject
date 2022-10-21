import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent
  }, {
    path: 'add',
    component: AddUserComponent
  }, {
    path: 'update/:id',
    component: AddUserComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
