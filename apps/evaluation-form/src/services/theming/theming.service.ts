import { ApplicationRef, Injectable } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  theme = new BehaviorSubject<TuiBrightness>('onLight');

  constructor(private ref: ApplicationRef) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        console.log('event', event);
        this.theme.next(event.matches ? 'onDark' : 'onLight');
      });

    // fromEvent<MediaQueryListEvent>(
    //   window.matchMedia('(prefers-color-scheme: dark)'),
    //   'change'
    // ).subscribe((event) => {
    //   console.log('event', event);
    //   event.matches ? 'onDark' : 'onLight';
    // });
  }
}
