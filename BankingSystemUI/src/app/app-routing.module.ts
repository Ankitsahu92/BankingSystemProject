import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
