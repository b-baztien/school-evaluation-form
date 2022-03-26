import { Component, Inject } from '@angular/core';
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
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
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
      .pipe(tap({ complete: () => console.log('complete') }))
      .subscribe();
  }
}
