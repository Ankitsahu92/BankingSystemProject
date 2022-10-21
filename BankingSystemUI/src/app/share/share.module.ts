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
import { CommonService } from './services/common.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

const primeng = [
  TableModule,
  ButtonModule,
  TooltipModule,
  ToastModule
];

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
    ...primeng,
  ],
  exports: [
    ...importedModule,
    ...bootstrap,
    ...component,
    ...primeng,
  ],
  providers: [
    BsDropdownConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CommonService,
    MessageService,
  ]
})
export class ShareModule { }