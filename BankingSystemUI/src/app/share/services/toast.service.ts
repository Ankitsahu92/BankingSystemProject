import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // private toastService: ToastService
  constructor(private messageService: MessageService) { }

  Success(msg: string, title: string = 'Banking System') {
    this.messageService.add({ severity: 'success', summary: title, detail: msg });
  }

  Info(msg: string, title: string = 'Banking System') {
    this.messageService.add({ severity: 'info', summary: title, detail: msg });
  }

  Warn(msg: string, title: string = 'Banking System') {
    this.messageService.add({ severity: 'warn', summary: title, detail: msg });
  }

  Error(msg: string, title: string = 'Banking System') {
    this.messageService.add({ severity: 'error', summary: title, detail: msg });
  }

  onConfirm() {
    this.messageService.clear('Confirm');
  }

  onReject() {
    this.messageService.clear('Confirm');
  }

  clear() {
    this.messageService.clear();
  }

}
