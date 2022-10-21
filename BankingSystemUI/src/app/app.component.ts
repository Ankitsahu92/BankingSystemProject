import { Component } from '@angular/core';
import { ToastService } from './share/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Banking System';

  constructor(private toastService: ToastService) {
  }

  onConfirm() {
    this.toastService.onConfirm();
  }

  onReject() {
    this.toastService.onReject();
  }
}
