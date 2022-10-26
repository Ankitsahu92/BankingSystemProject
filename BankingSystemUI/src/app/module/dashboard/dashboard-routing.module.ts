import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'user',
        loadChildren: () => import('./dashboard/components/user-dashboard/user-dashboard.module')
          .then(m => m.UserDashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./dashboard/components/account-management/account-management.module')
          .then(m => m.AccountManagementModule)
      }, {
        path: 'account',
        loadChildren: () => import('./dashboard/components/account-management/account-management.module')
          .then(m => m.AccountManagementModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
