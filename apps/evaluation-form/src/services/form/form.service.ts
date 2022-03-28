import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormService {
  private submit$ = new Subject();

  get getSubmitSubject() {
    return this.submit$.asObservable();
  }

  submitForm() {
    this.submit$.next(null);
  }
}
