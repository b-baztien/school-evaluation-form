/* eslint-disable @typescript-eslint/no-namespace */
import { AbstractControl, Validators } from '@angular/forms';

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
