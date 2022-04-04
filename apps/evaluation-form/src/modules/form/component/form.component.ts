import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormService } from '../../../services/form/form.service';
import { RootStoreService } from '../../../services/root-store/root-store.service';

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnDestroy {
  formId!: string;

  destroy$ = new Subject<void>();

  constructor(
    public rootStoreService: RootStoreService,
    private formService: FormService
  ) {
    this.formId = localStorage.getItem('formId') ?? '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prevForm() {
    this.rootStoreService.backStep();
  }

  nextForm() {
    this.formService.submitForm();
  }
}
