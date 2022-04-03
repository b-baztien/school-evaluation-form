/* eslint-disable @typescript-eslint/no-namespace */
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  export const markAsTouched = (form: FormGroup | FormArray) => {
    if (form instanceof FormGroup) {
      for (const item of Object.keys(form.controls)) {
        if (form.controls[item] instanceof FormGroup) {
          markAsTouched(form.controls[item] as FormGroup);
          continue;
        } else if (form.controls[item] instanceof FormArray) {
          markAsTouched(form.controls[item] as FormArray);
          continue;
        }

        form.controls[item].markAsDirty();
      }
    } else {
      for (const item of form.controls) {
        if (item instanceof FormGroup) {
          markAsTouched(item as FormGroup);
          continue;
        } else if (item instanceof FormArray) {
          markAsTouched(item as FormArray);
          continue;
        }

        item.markAsTouched();
      }
    }
    return;
  };
}
