import { Component, OnInit } from '@angular/core';
import { AddUpdateBalanceService } from '../add-update-balance.service';

@Component({
  selector: 'app-add-update-balance',
  templateUrl: './add-update-balance.component.html',
  styleUrls: ['./add-update-balance.component.scss']
})
export class AddUpdateBalanceComponent implements OnInit {
  selectTab: string = 'AccountSummary'
  IsAdmin: boolean = false;
  constructor(private addUpdateBalanceService: AddUpdateBalanceService) { }

  ngOnInit(): void {
    this.IsAdmin = this.addUpdateBalanceService.IsAdmin();
  }

}
