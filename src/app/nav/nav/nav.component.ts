import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/auth/AlertifyService/alertify.service';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  imageUrl: string;
  constructor(public authservices: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
this.authservices.currentPhotoUrl.subscribe(pUrl =>this.imageUrl=pUrl)
  }

  login() {
    this.authservices.login(this.model).subscribe(
      respon => { this.alertify.success('Login Successfully.'); },
      error => { this.alertify.error(error); },
      () => { this.router.navigate(['/memberList']); }
    );
  }

  loggedIn(): boolean {
    return this.authservices.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authservices.decodedToken = null;
    this.authservices.currentUser = null!;

    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }


}
