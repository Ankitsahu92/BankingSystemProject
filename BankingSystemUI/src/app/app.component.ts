import { Component } from '@angular/core';
import { ToastService } from './share/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Banking System';
  year: number = 2022;
  constructor(private toastService: ToastService) {
    this.year = new Date().getFullYear()
  }

  onConfirm() {
    this.toastService.onConfirm();
  }

  onReject() {
    this.toastService.onReject();
  }
}
