import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/auth/AlertifyService/alertify.service";
import { UserService } from "../_services/auth/UserService/user.service";

@Injectable()


export class MemberDetailResolver implements Resolve<User>{

    constructor(private userServoce: UserService, private router: Router,
        private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | any {
        return this.userServoce.getUser(route.params['id']).pipe(
            catchError(err => {
                console.log(err);
                this.alertify.error('there is something problem retving data');
                this.router.navigate(['/member-list']);
                return of(null);
            })
        );
    }
}