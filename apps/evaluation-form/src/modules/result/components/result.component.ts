import { Component } from '@angular/core';
import { sum } from '@taiga-ui/cdk';

@Component({
  selector: 'school-evaluation-form-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  private readonly labels = ['Food', 'Cafe', 'Open Source', 'Taxi', 'other'];
  readonly value = [13769, 12367, 10172, 3018, 2592];
  readonly sum = sum(...this.value);

  getValue(index: number): number {
    return Number.isNaN(index) ? this.sum : this.value[index];
  }

  getLabel(index: number): string {
    return Number.isNaN(index) ? 'Total' : this.labels[index];
  }

  show() {
    window.print();
  }
}
