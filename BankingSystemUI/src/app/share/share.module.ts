import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//D:\LTI\Angular\Angular
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NanBarComponent } from './component/nan-bar/nan-bar.component';
import { RouterModule } from '@angular/router';

import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TokenInterceptor } from './Interceptor/token.interceptor';

const importedModule = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RouterModule
]

const bootstrap = [
  BsDropdownModule
]

const component = [
  NanBarComponent
];

@NgModule({
  declarations: [
    ...component
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ...importedModule,
    ...bootstrap,
  ],
  exports: [
    ...importedModule,
    ...bootstrap,
    ...component
  ],
  providers: [BsDropdownConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }]
})
export class ShareModule { }