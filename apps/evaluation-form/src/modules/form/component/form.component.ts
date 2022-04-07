import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  role!: string;

  destroy$ = new Subject<void>();

  constructor(
    public rootStoreService: RootStoreService,
    private formService: FormService,
    private router: Router
  ) {
    const { role } = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.role = role;
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

  goToResult() {
    this.router.navigate(['/result']);
  }
}
