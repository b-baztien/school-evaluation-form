/* eslint-disable @typescript-eslint/no-namespace */
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export namespace CustomValidator {
  export const required = (option: { text?: string } = {}) => {
    const { text } = option;

    return (field: AbstractControl): Validators | null =>
      field.value
        ? null
        : {
            other: text ? `กรุณากรอก ${text}` : 'กรุณากรอกฟิลด์นี้',
          };
  };
}

export namespace FormValidator {
  export const markAsTouched = (formGroup: FormGroup) => {
    for (const item of Object.keys(formGroup.controls)) {
      formGroup.controls[item].markAsTouched();
    }

    return;
  };
}
