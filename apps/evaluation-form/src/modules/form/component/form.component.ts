import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { mapTo, merge, Subject, tap } from 'rxjs';
import { FormUser } from '../../../interfaces/form-user.interface';
import { ConfigurationForm } from '../../../utils/configulation-form';
import {
  CustomValidator,
  FormValidator,
} from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formStepIndex = 0;
  decreaseFormStepIndex$ = new Subject();
  increaseFormStepIndex$ = new Subject();

  listFormStep = [
    'ข้อมูลผู้ทำแบบประเมิน',
    'Second step',
    'Third step',
    'Fourth step',
  ];

  forms: ConfigurationForm<FormUser> = {
    schoolName: new FormControl(
      '',
      CustomValidator.required({ text: 'โรงเรียน' })
    ),
    group: new FormControl(
      '',
      CustomValidator.required({ text: 'กลุ่มเครือข่าย' })
    ),
    address: new FormControl('', CustomValidator.required({ text: 'ที่อยู่' })),
    district: new FormControl('', CustomValidator.required({ text: 'อำเภอ' })),
    province: new FormControl(
      { value: 'ลำปาง', disabled: true },
      CustomValidator.required({ text: 'จังหวัด' })
    ),
    managerName: new FormControl(
      '',
      CustomValidator.required({ text: 'ชื่อ-สกุล ผู้บริหารสถานศึกษา' })
    ),
    startPostionYear: new FormControl(
      '',
      CustomValidator.required({ text: 'ดำรงตำแหน่งตั้งแต่ปี' })
    ),
    managerPhone: new FormControl(
      '',
      CustomValidator.required({ text: 'เบอร์โทร' })
    ),
    fullname: new FormControl(
      '',
      CustomValidator.required({ text: 'ชื่อ-สกุล ครูที่รับผิดชอบ' })
    ),
    startYear: new FormControl(
      '',
      CustomValidator.required({ text: 'ตั้งแต่ปี' })
    ),
    phone: new FormControl('', CustomValidator.required({ text: 'เบอร์โทร' })),
    time: new FormControl('1'),
    date: new FormControl(
      null,
      CustomValidator.required({ text: 'วัน/เดือน/ปี' })
    ),
  };

  formGroup = new FormGroup(this.forms);

  formUser!: Partial<FormUser>;

  constructor(private router: Router) {
    this.formUser = JSON.parse(localStorage.getItem('formUser') || '{}');

    this.formGroup.patchValue(this.formUser);

    merge(
      this.decreaseFormStepIndex$.pipe(mapTo(-1)),
      this.increaseFormStepIndex$.pipe(mapTo(+1))
    )
      .pipe(
        tap({
          next: (value) => {
            if (this.formStepIndex + value !== this.listFormStep.length)
              this.formStepIndex += value;
          },
        })
      )
      .subscribe();
  }

  prevForm() {
    this.decreaseFormStepIndex$.next(null);
  }

  nextForm() {
    FormValidator.markAsTouched(this.formGroup);
    if (this.formGroup.invalid) return;

    localStorage.setItem('formUser', JSON.stringify(this.formGroup.value));

    this.increaseFormStepIndex$.next(null);
  }
}
