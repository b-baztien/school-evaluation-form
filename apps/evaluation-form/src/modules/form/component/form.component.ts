import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  formGroup = new FormGroup({
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
  });

  nextForm() {
    FormValidator.markAsTouched(this.formGroup);
    if (this.formGroup.invalid) return;
  }
}
