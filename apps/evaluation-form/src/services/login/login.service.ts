import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@school-evaluation-form/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: User) {
    return this.http.post(`${environment.apiEndPoint}/user/login/`, login);
  }
}
