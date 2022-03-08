import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { PaginationResult } from 'src/app/_models/pagination';
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

export class UserService {

  BaseUrl: string = environment.apiUrl + 'Users/';

  constructor(private _http: HttpClient) { }

  getUsers(page?: string, itemsPerPage?: string, userParams?: any, likesParam?: any): Observable<PaginationResult<User[]>> {

    const paginationResult: PaginationResult<User[]> | any = new PaginationResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('MinAge', userParams.MinAge);
      params = params.append('MaxAge', userParams.MaxAge);
      params = params.append('Gender', userParams.Gender);
      params = params.append('OrderBy', userParams.OrderBy);
    }

    if (likesParam === 'Likers')
      params = params.append('Likers', 'true');

    if (likesParam === 'Likees')
      params = params.append('Likees', 'true');

    let url = this.BaseUrl + 'getusers';

    return this._http.get<PaginationResult<User[]>>(`${url}`, { headers: httpOptions.Headers, observe: 'response', params })
      .pipe(
        map(
          resp => {

            paginationResult.result = resp.body;

            if (resp.headers.get('Pagination') !== null) {
              paginationResult.pagination = JSON.parse(resp.headers.get('Pagination') || '');
            }
            return paginationResult;
          })
      );
  }

  getUser(id: number): Observable<User> {
    let url = this.BaseUrl + 'getuser/' + id;

    return this._http.get<User>(`${url}`, { headers: httpOptions.Headers });
  }

  updateUser(id: number, user: User) {

    let url = this.BaseUrl + 'UpdateUser/' + id;

    return this._http.post<User>(`${url}`, user, { headers: httpOptions.Headers });
  }

  setMainPhoto(userId: number, id: number) {
    let url = this.BaseUrl + userId + '/photos/setMainPhoto/' + id;

    return this._http.post(`${url}`, null, { headers: httpOptions.Headers });
  }

  deletePhoto(userId: number, id: number) {
    let url = this.BaseUrl + userId + '/photos/deletePhoto/' + id;

    return this._http.delete(`${url}`, { headers: httpOptions.Headers });
  }

  sendLike(id: number, recipientId: number) {
    let url = this.BaseUrl + id + '/like/' + recipientId;

    return this._http.post(`${url}`, null, { headers: httpOptions.Headers });
  }

  getMessages(id: number, page?: string, itemsPerPage?: string, messageContainer?: string | any) {

    const paginationResult: PaginationResult<Message[]> | any = new PaginationResult<Message[]>();

    let url = this.BaseUrl + id + '/messages/GetMessagesForUser';

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this._http.get<Message[]>(`${url}`, { headers: httpOptions.Headers, observe: 'response', params })
      .pipe(map(resp => {
        paginationResult.result = resp.body;
        if (resp.headers.get('Pagination') !== null) {
          paginationResult.pagination = JSON.parse(resp.headers.get('Pagination') || '');
        }
        return paginationResult;
      })
      );
  }

  getMessagesThread(userId: number, recipientId: number) {
    let url = this.BaseUrl + userId + '/messages/GetMessageThread/thread/' + recipientId;

    return this._http.get<Message[]>(`${url}`, { headers: httpOptions.Headers });

  }

  sendMessage(userId: number, message: Message) {
    let url = this.BaseUrl + userId + '/messages/CreateMessage';

    return this._http.post(`${url}`, message, { headers: httpOptions.Headers });
  }

  deleteMessage(id: number, userId: number) {
    let url = this.BaseUrl + userId + '/messages/DeleteMessage/' + id;

    return this._http.post(`${url}`, null, { headers: httpOptions.Headers });
  }

  markAsRead(id: number, userId: number) {
    let url = this.BaseUrl + userId + '/messages/MarkAsRead/' + id;

    return this._http.post(`${url}`, null, { headers: httpOptions.Headers }).subscribe();
  }
}
