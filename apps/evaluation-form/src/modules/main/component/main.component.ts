import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { tap } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router
  ) {}

  goToForm(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ) {
    this.dialogService
      .open(content, {
        header,
        size,
      })
      .pipe(tap({ complete: () => this.router.navigate(['/form']) }))
      .subscribe();
  }
}
