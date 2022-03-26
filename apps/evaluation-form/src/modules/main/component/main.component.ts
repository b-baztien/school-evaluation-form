import { Component, Inject } from '@angular/core';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

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
    console.log('goToForm');
    this.dialogService
      .open(content, {
        label: 'What a cool library set',
        header,
        size,
      })
      .subscribe();
  }
}
