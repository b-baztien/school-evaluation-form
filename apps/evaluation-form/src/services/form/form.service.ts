import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formStepIndex = 0;
  decreaseFormStepIndex$ = new Subject();
  increaseFormStepIndex$ = new Subject();

  canNext$ = new Subject();
  canPrev$ = new Subject();
}
