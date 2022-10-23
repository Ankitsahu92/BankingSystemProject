import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-update-balance',
  templateUrl: './add-update-balance.component.html',
  styleUrls: ['./add-update-balance.component.scss']
})
export class AddUpdateBalanceComponent implements OnInit {
  selectTab: string = 'AccountSummary'
  constructor() { }

  ngOnInit(): void {
  }

}
