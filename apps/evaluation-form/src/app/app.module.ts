import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {
  TuiDialogModule,
  TuiNotificationsModule,
  TuiRootModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  AppState,
  formUserReducer,
  stepperReducer,
} from '../store/root-store.reducer';
import { SharedModule } from '../utils/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot<AppState>({
      stepper: stepperReducer,
      formUser: formUserReducer,
    }),
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
  ],
  exports: [AppRoutingModule],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
