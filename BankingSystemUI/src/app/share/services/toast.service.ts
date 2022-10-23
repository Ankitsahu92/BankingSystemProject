import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  sendDataSubject = new Subject<any>();
  // private toastService: ToastService
  constructor(private messageService: MessageService) { }

  sendData(value: any) {
    this.sendDataSubject.next(value);
  }

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

  confirmID: string = "";
  showConfirm(actionType: string = 'ConfirmID', summary: string = 'Are you sure?', detail: string = 'Confirm to proceed') {
    this.confirmID = actionType;
    this.messageService.clear();
    this.messageService.add({ key: 'Confirm', sticky: true, severity: 'warn', summary: summary, detail: detail });
  }

  onConfirm() {
    switch (this.confirmID) {
      case 'ConfirmID':
        this.messageService.clear('Confirm');
        this.sendData({ type: 'onConfirm', data: null });
        break;
      default:
        this.messageService.clear('Confirm');
        break;
    }

  }

  onReject() {
    switch (this.confirmID) {
      case 'ConfirmID':
        this.sendData({ type: 'onReject', data: null });
        this.messageService.clear('Confirm');
        break;
      default:
        this.messageService.clear('Confirm');
        break;
    }
    this.messageService.clear('Confirm');
  }

  clear() {
    this.messageService.clear();
  }

}
