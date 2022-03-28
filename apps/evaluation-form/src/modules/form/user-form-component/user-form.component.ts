import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form/form.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormUser } from '../../../interfaces/form-user.interface';
import { ConfigurationForm } from '../../../utils/configulation-form';
import {
  CustomValidator,
  FormValidator,
} from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnDestroy {
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
  destroy$ = new Subject<void>();

  constructor(private formService: FormService) {
    this.formUser = JSON.parse(localStorage.getItem('formUser') || '{}');

    this.formGroup.patchValue(this.formUser);

    this.onSubmit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.formService.canNext$
      .pipe(
        tap({
          next: () => {
            FormValidator.markAsTouched(this.formGroup);
            if (this.formGroup.invalid) return;
            localStorage.setItem(
              'formUser',
              JSON.stringify(this.formGroup.value)
            );
            this.formService.increaseFormStepIndex$.next(null);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
