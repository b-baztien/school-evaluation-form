import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@school-evaluation-form/api-interfaces';
import { TuiValidationError } from '@taiga-ui/cdk';
import { LoginService } from 'apps/evaluation-form/src/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject, takeUntil, tap, timer } from 'rxjs';
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

  error = new BehaviorSubject<TuiValidationError | null>(null);

  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    this.error.next(null);

    FormValidator.markAsTouched(this.loginForm);

    if (this.loginForm.invalid) return;

    const login = this.loginForm.getRawValue() as User;

    this.loginService
      .login(login)
      .pipe(
        tap({
          subscribe: () => this.spinner.show(),
          next: (result) => {
            console.log(result);
            sessionStorage.setItem('user', JSON.stringify(result));
          },
          error: ({ error }) => {
            this.error.next(new TuiValidationError(error.message));
          },
          finalize: () => this.spinner.hide(),
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate(['/main']));
  }
}
