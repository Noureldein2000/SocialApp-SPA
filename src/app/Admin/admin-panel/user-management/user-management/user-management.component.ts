import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/auth/AdminService/admin.service';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { RolesModalComponent } from '../../roles-modal/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      resp => {
        this.users = resp;
      },
      err => {
        console.log(err);
        this.alertify.error('Failed to get users roles..');
      });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedRoles.subscribe(
      (values: any) => {
        const rolesToUpdate = {
          RolesName: [...values.filter((el: any) => el.checked === true).map((el: any) => el.name)]
        };

        // console.log(rolesToUpdate);
        if (rolesToUpdate) {
          this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(
            resp => {
              user.roles = [...rolesToUpdate.RolesName];
            },
            err => {
              console.log(err);
              this.alertify.error('Failed to change roles');
            });
        }
      }
    );
  }

  private getRolesArray(user: User) {

    const roles = [];
    const userRoles = user.roles;
    const avaiableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'VIP', value: 'VIP' },
      { name: 'Member', value: 'Member' }
    ];

    for (let i = 0; i < avaiableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (avaiableRoles[i].name === userRoles[j]) {
          isMatch = true;
          avaiableRoles[i].checked = true;
          roles.push(avaiableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        avaiableRoles[i].checked = false;
        roles.push(avaiableRoles[i]);
      }
    }
    return roles;
  }
}

