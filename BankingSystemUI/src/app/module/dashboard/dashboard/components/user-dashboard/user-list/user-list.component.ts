import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersModels } from 'src/app/share/models/usersModels';
import { CommonService } from 'src/app/share/services/common.service';
import { ToastService } from 'src/app/share/services/toast.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  userList: UsersModels[] = [];
  selectedUser?: UsersModels;
  first = 0;
  rows = 10;
  accountType: any[] = [];

  constructor(
    private route: Router,
    private commonService: CommonService,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.accountType = this.commonService.getAccountType();
    this.getAllUsers();

    this.subscription = this.toastService.sendDataSubject.subscribe(
      (data) => {
        switch (data.type) {
          case 'onConfirm':
            this.DeleteUsers();
            break;
          case 'onReject':
            break;
          default:
            break;
        }

      }
    );
  }

  GetaccountType(id: string) {
    const num = +id;
    return num ? this.accountType.find(f => f.value == num).name : id;
  }

  getAllUsers() {
    this.userService.GetAllUsers().subscribe((res: UsersModels[]) => {
      this.userList = res;
    })
  }

  DeleteUsers() {
    if (this.deleteUserId && this.deleteUserId > 0) {
      this.userService.DeleteUsers({ "userId": this.deleteUserId })
        .subscribe((res: any) => {
          if (res) { this.getAllUsers(); }
        })
    }
  }

  //table 

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.userList ? this.first === (this.userList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.userList ? this.first === 0 : true;
  }
  //table End


  onEditClick(userId: any) {
    this.route.navigate(["dashboard", "user", 'update', userId]);
  }
  deleteUserId: number = 0;
  onDeleteClick(userId: number) {
    this.deleteUserId = userId;
    this.toastService.showConfirm();
  }

  //routerLink="/dashboard/user/add"
  RegisterNewUser() {
    this.route.navigate(["dashboard", "user", 'add']);
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
