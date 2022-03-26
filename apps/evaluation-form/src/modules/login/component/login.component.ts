import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil, tap, timer } from 'rxjs';
import {
  CustomValidator,
  FormValidator,
} from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', [
      CustomValidator.required({ text: 'ชื่อผู้ใช้งาน' }),
    ]),
    password: new FormControl('', [
      CustomValidator.required({ text: 'รหัสผ่าน' }),
    ]),
  });

  destroy$ = new Subject<void>();

  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    FormValidator.markAsTouched(this.loginForm);

    if (this.loginForm.invalid) return;

    timer(3000)
      .pipe(
        tap({
          subscribe: () => this.spinner.show(),
          complete: () => this.spinner.hide(),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate(['/main']));
  }
}
