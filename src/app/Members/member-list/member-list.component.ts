import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { UserService } from 'src/app/_services/auth/UserService/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user') || '{}');
  genderList: [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  userParams: any = {};
  pagination: Pagination;

  constructor(private _user: UserService, private _altertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    
    this.userParams.Gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.MinAge = 18;
    this.userParams.MaxAge = 90;
    this.userParams.OrderBy='LastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilter() {
    console.log('reset filteration');
    this.userParams.Gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.MinAge = 18;
    this.userParams.MaxAge = 90;
    this.loadUsers();
  }

  loadUsers() {
    this._user.getUsers(this.pagination.currentPage.toString(), this.pagination.itemsPerPage.toString(), this.userParams).subscribe(
      (resp: PaginationResult<User[]>) => {
        this.users = resp.result;
        this.pagination = resp.pagination;
      },
      error => { this._altertify.error(error); }
    );
  }

}
