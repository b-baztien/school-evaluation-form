import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TUI_SANITIZER } from '@taiga-ui/cdk';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { SharedModule } from '../utils/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [AppRoutingModule],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
