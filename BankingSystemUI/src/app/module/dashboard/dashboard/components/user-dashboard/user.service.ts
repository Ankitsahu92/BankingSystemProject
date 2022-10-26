import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersModels } from 'src/app/share/models/usersModels';
import { CommonService } from 'src/app/share/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  GetAllUsers(): any {
    return this.http.get<UsersModels[]>(`${environment.url}Users`);
  }

  GetUsersByID(id: number): any {
    return this.http.get<UsersModels>(`${environment.url}Users/${id}`);
  }

  AddOrUpdateUsers(params: any): any {
    if (params?.id && +params.id == 0) {
      return this.http.post<any>(`${environment.url}Users`, { ...params, ...this.commonService.getCreateObj() });
    }
    else {
      return this.http.put<any>(`${environment.url}Users`, { ...params, ...this.commonService.getUpdateObj() });
    }
  }

  DeleteUsers(params: any): any {
    return this.http.put<any>(`${environment.url}Users/DeleteUser`, { ...params, ...this.commonService.getUpdateObj() });
  }


}
