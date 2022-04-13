import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserForm } from '@school-evaluation-form/api-interfaces';
import { first, Subject, takeUntil, tap } from 'rxjs';
import { FormService } from '../../../services/form/form.service';
import { RootStoreService } from '../../../services/root-store/root-store.service';
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
  forms: ConfigurationForm<UserForm> = {
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
  formUser!: Partial<UserForm>;
  destroy$ = new Subject<void>();

  role!: string;

  constructor(
    private rootStoreService: RootStoreService,
    private formService: FormService
  ) {
    const { role } = JSON.parse(sessionStorage.getItem('user') ?? '{}') as User;
    this.role = role;

    this.rootStoreService.formUser$
      .pipe(
        first(),
        tap({ next: (formUser) => (this.formUser = { ...formUser }) }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.formService.getSubmitSubject
      .pipe(tap({ next: () => this.onSubmit() }), takeUntil(this.destroy$))
      .subscribe();

    this.formGroup.patchValue(this.formUser);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    FormValidator.markAsTouched(this.formGroup);
    // if (this.formGroup.invalid) return;

    const formUser = this.formGroup.getRawValue() as UserForm;

    this.rootStoreService.submitForm(formUser);
    this.rootStoreService.nextStep();
  }
}
