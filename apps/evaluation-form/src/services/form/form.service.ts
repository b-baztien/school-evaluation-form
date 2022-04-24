import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm } from '@school-evaluation-form/api-interfaces';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FormService {
  private submit$ = new Subject();

  get getSubmitSubject() {
    return this.submit$.asObservable();
  }

  constructor(private http: HttpClient) {}

  uploadFile(username: string, file: File) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data')
      .set('Accept', 'application/json');
    return this.http.post<string>(
      `${environment.apiEndPoint}/${username}`,
      file,
      {
        headers: headers,
      }
    );
  }

  addUserForm(userForm: UserForm) {
    return this.http.post(`${environment.apiEndPoint}/user-form`, userForm);
  }

  submitForm() {
    this.submit$.next(null);
  }
}
