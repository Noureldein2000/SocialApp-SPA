import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/auth/AlertifyService/alertify.service";
import { UserService } from "../_services/auth/UserService/user.service";

@Injectable()


export class LikesListResolver implements Resolve<User[]>{
    pageNumber="1";
    pageSize="5";
    likesParam='likers';

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | any {
        return this.userService.getUsers(this.pageNumber,this.pageSize,null,this.likesParam).pipe(
            catchError(err => {
                this.alertify.error('there is something problem retving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}