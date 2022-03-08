import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { UserService } from 'src/app/_services/auth/UserService/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs', { static: true}) memberTab: TabsetComponent;
  user: User;

  constructor(private _userService: UserService, private _alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTabs = params['tab'];
      this.memberTab.tabs[selectedTabs > 0 ? selectedTabs : 0].active = true;
    });

  }

  selectTab(tabId: number) {
    this.memberTab.tabs[tabId].active = true;
  }

  // loadUser() {
  //      this._userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     resp => { this.user = resp; },
  //     error => { 
  //       console.log(error);
  //       this._alertify.error(error); }
  //   );
  //}

}
