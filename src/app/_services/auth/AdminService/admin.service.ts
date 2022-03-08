import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';


const httpOptions = {
  Headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
    // 'Content-Type': 'application/json',
    // Accept: '*/*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = environment.apiUrl + 'admin/';

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    let url = this.baseUrl + 'GetUsersWithRoles';
    return this.http.get<User[]>(`${url}`, { headers: httpOptions.Headers });
  }

  updateUserRoles(user: User, roleEditDto: {}) {
    debugger;
    console.log(roleEditDto);
    let url = this.baseUrl + 'EditRoles/' + user.username;
    return this.http.post(`${url}`, roleEditDto, { headers: httpOptions.Headers });
  }
}
