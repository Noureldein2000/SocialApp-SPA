import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/_models/message';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/auth/UserService/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private authService: AuthService, private userSerive: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userSerive.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage.toString(), this.pagination.itemsPerPage.toString(), this.messageContainer).subscribe(
      (resp: PaginationResult<Message[]>) => {
        this.messages = resp.result;
        this.pagination = resp.pagination;
      },
      error => { this.alertify.error(error); }
    );
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure to delete this message?', () => {
      this.userSerive.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted');
      }, err => {
        console.log(err);
        this.alertify.error('Failed to delete this message');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
