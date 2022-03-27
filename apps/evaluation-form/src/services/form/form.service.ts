import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormService {
  decreaseFormStepIndex$ = new Subject();
  increaseFormStepIndex$ = new Subject();

  canNext$ = new Subject();
  canPrev$ = new Subject();
}
