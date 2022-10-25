import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/share/constant/constant';
import { AuthService } from 'src/app/share/services';
import { CommonService } from 'src/app/share/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddUpdateBalanceService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  IsAdmin() {
    const isAdmin = this.authService.getlocalStorageValue(AppConstants.IsAdmin);
    return isAdmin == 'true';
  }

  GetAllAccountNo(): any {
    return this.http.get<any>(`${environment.url}Accounts/GetAllAccountNo`);
  }

  AccountBalanceResponse(accountNo: any): any {
    return this.http.get<any>(`${environment.url}Accounts/GetAccountBalanceByAccountNo?accountNo=${accountNo}`);
  }

  AddAndSubtractBalances(parms: any): any {
    return this.http.post<any>(`${environment.url}Accounts/AddAndSubtractBalances`, { ...parms, ...this.commonService.getCreateObj() });
  }

  FundTransfer(parms: any): any {
    return this.http.post<any>(`${environment.url}Accounts/FundTransfer`, { ...parms, ...this.commonService.getCreateObj() });
  }

  GetTop10TransactionByAccountNo(accountNo: string): any {
    return this.http.get<any>(`${environment.url}Accounts/GetTop10TransactionByAccountNo?accountNo=${accountNo}`);
  }

  GetTransactionByAccountNoAndDate(parms: any): any {
    return this.http.post<any>(`${environment.url}Accounts/GetTransactionByAccountNoAndDate`, { ...parms });
  }

}
