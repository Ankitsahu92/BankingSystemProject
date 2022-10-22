import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersModels } from 'src/app/share/models/usersModels';
import { CommonService } from 'src/app/share/services/common.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: UsersModels[] = [];
  selectedUser?: UsersModels;
  first = 0;
  rows = 10;
  accountType: any[] = [];

  constructor(
    private route: Router,
    private commonService: CommonService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.accountType = this.commonService.getAccountType();
    this.getAllUsers();
  }

  GetAccounType(id: string) {
    const num = +id;
    return num ? this.accountType.find(f => f.value == num).name : id;
  }

  getAllUsers() {
    this.userService.GetAllUsers().subscribe((res: UsersModels[]) => {
      console.log(res, "GetAllUsers");
      this.userList = res;
    })
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

  onDeleteClick(userId: any) {


  }

  //routerLink="/dashboard/user/add"
  RegisterNewUser() {
    this.route.navigate(["dashboard", "user", 'add']);
  }
}
