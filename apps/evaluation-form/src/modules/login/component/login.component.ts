import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap, timer } from 'rxjs';
import { CustomValidator } from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      CustomValidator.required({ text: 'ชื่อผู้ใช้งาน' }),
    ]),
    password: new FormControl('', [
      CustomValidator.required({ text: 'รหัสผ่าน' }),
    ]),
  });

  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  login() {
    if (this.loginForm.invalid) return;

    timer(3000)
      .pipe(
        tap({
          subscribe: () => this.spinner.show(),
          complete: () => this.spinner.hide(),
        })
      )
      .subscribe(() => this.router.navigate(['/main']));
  }
}
