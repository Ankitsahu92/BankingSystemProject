import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService, Events } from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  httpRequestSub?: Subscription;
  httpResponseSub?: Subscription;
  enabled = false;
  queue = new Array();
  timerId: number | null = null;
  timerHideId: number | null = null;
  @Input() delay = 500;

  constructor(private service: SpinnerService) { }

  ngOnInit(): void {
    // Handle request
    this.httpRequestSub = this.service.on(Events.httpRequest, (() => {
      this.queue.push(1);

      if (this.queue.length === 1) {

        // Only show if we have an item in the queue after the delay time
        setTimeout(() => {
          if (this.queue.length) {
            this.enabled = true;
          }
        }, 0);
      }
    }));

    // Handle response
    this.httpResponseSub = this.service.on(Events.httpResponse, (() => {
      this.queue.pop();

      if (this.queue.length === 0) {
        // Since we don't know if another XHR request will be made, pause before
        // hiding the overlay. If another XHR request comes in then the overlay
        // will stay visible which prevents a flicker
        setTimeout(() => {
          // Make sure queue is still 0 since a new XHR request may have come in
          // while timer was running
          if (this.queue.length === 0) { this.enabled = false; }
        }, this.delay);
      }
    }));
  }
  ngOnDestroy() {
    this.httpRequestSub?.unsubscribe();
    this.httpResponseSub?.unsubscribe();
  }

}
