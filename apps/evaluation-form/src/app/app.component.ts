import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemingService } from '../services/theming/theming.service';

@Component({
  selector: 'school-evaluation-form-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(public themingService: ThemingService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
