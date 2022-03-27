import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[schoolEvaluationFormInputNumber]',
})
export class InputNumberDirective {
  @HostListener('keypress', ['$event']) keyNumberEnterOnlyDirective(
    event: KeyboardEvent
  ) {
    if (/[0-9]/.test(event.key)) {
      return;
    }

    event.preventDefault();
  }
}
