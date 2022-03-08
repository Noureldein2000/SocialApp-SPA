import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/auth/UserService/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};


  constructor(private authService: AuthService, private userSerive: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadMessgaes();
  }

  loadMessgaes() {

    const currentUserId: number = this.authService.decodedToken.nameid;

    this.userSerive.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(msgs => {
          for (let i = 0; i < msgs.length; i++) {
            if (msgs[i].isRead === false && msgs[i].recipientId === currentUserId) {
              this.userSerive.markAsRead(msgs[i].id, currentUserId);
            }
          }
        })
      )
      .subscribe(
        resp => {
          this.messages = resp;
          this.alertify.success('Retreiving messages successfully');
        },
        err => {
          console.log(err);
          this.alertify.error('there is problem with retreiving messages');
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userSerive.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(
      (resp: any) => {
        this.messages.unshift(resp);
        this.newMessage.content = '';
        this.alertify.success('Message Sent Successfully..');
      },
      err => {
        console.log(err);
        this.alertify.error('Failure to Send Message..!');
      }
    );
  }

}


