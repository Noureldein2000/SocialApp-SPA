import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/auth/UserService/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editform') editForm: NgForm
  user: User | any;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(pUrl => this.photoUrl = pUrl);
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      resp => {
        this.alertify.success('Profile Updated Successfully');
        this.editForm.reset(this.user);
      },
      err => {
        console.log(err);
        this.alertify.error(err);
      }
    );

  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
