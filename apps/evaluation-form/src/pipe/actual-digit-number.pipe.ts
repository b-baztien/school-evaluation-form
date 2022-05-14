import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actualDigitNumber',
})
export class ActualDigitNumberPipe implements PipeTransform {
  transform(value: number, args: number = 3): any {
    return value
      .toString()
      .padEnd(2, '.')
      .padEnd(args + 2, '0')
      .slice(0, args + 2);
  }
}
