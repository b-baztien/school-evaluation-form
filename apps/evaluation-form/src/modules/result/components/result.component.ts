import { ChangeDetectionStrategy, Component } from '@angular/core';
import { sum } from '@taiga-ui/cdk';

@Component({
  selector: 'school-evaluation-form-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  value = [123, 456];
  title = 'ด้านนโยบาย';

  show() {
    window.print();
  }
}
