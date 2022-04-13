import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'school-evaluation-form-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  readonly labels = ['คะแนนที่ได้', 'คะแนนที่ขาด'];

  @Input('value') value!: number[];
  @Input('title') title!: string;
  
  activeItemIndex: number | null = null;

  getValue(index: number): number {
    return Number.isNaN(index ?? NaN) ? this.value[0] : this.value[index];
  }

  getLabel(index: number): string {
    return Number.isNaN(index ?? NaN) ? 'คะแนนที่ได้' : this.labels[index];
  }

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean) {
    this.activeItemIndex = hovered ? index : null;
  }

  getColor(index: number): string {
    return index === 0 ? 'var(--tui-success-fill)' : 'var(--tui-base-04)';
  }
}
