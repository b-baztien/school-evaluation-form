import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm } from '@school-evaluation-form/api-interfaces';
import { map, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class FormService {
  private submit$ = new Subject<void>();

  get getSubmitSubject() {
    return this.submit$.asObservable();
  }

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(
      `${environment.apiEndPoint}/upload-file/file`,
      formData
    );
  }

  addUserForm(userForm: Partial<UserForm>) {
    return this.http.post<Partial<UserForm>>(
      `${environment.apiEndPoint}/user-form`,
      userForm
    );
  }

  submitForm() {
    this.submit$.next();
  }
}
