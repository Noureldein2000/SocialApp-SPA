import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/message";
import { AlertifyService } from "../_services/auth/AlertifyService/alertify.service";
import { AuthService } from "../_services/auth/auth.service";
import { UserService } from "../_services/auth/UserService/user.service";

@Injectable()


export class MessageListResolver implements Resolve<Message[]>{
    pageNumber = "1";
    pageSize = "5";
    messageContainer = 'Unread';

    constructor(private userServoce: UserService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> | Promise<Message[]> | any {

        return this.userServoce.getMessages(this.authService.decodedToken.nameid,this.pageNumber, this.pageSize,this.messageContainer).pipe(
            catchError(err => {
                this.alertify.error('Something problem retrieving Messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}