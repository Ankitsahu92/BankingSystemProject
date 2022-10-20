import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.getIPAddress();
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      localStorage.setItem(AppConstants.IPAddress, res.ip)
    });
  }

  login(params: { "username": string, "password": string }): any {
    return this.http.post<any>(`${environment.url}Users/Authenticate`, params);
  }

  getlocalStorageValue(name: string) {
    return localStorage.getItem(name)
  }

  setlocalStorageValue(name: string, value: string) {
    return localStorage.setItem(name, value)
  }

  clearlocalStorageValue() {
    return localStorage.clear()
  }

}
