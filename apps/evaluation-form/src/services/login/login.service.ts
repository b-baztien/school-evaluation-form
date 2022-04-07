import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@school-evaluation-form/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: User) {
    return this.http.post('http://localhost:3333/api/user/login/', login);
  }
}
