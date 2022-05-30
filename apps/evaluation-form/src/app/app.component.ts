import { Component } from '@angular/core';
import { User } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { FormService } from '../services/form/form.service';
import { RootStoreService } from '../services/root-store/root-store.service';

@Component({
  selector: 'school-evaluation-form-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
