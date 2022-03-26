import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiCurrency } from '@taiga-ui/addon-commerce';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiPluralize } from '@taiga-ui/core';

class User {
  constructor(readonly firstName: string, readonly lastName: string) {}

  toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Account {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly amount: number,
    readonly currency: TuiCurrency,
    readonly cardSvg: string
  ) {}
}

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  readonly svgIcons = {
    common: 'https://ng-web-apis.github.io/dist/assets/images/common.svg',
    universal: 'https://ng-web-apis.github.io/dist/assets/images/universal.svg',
    intersection:
      'https://ng-web-apis.github.io/dist/assets/images/intersection-observer.svg',
    mutation:
      'https://ng-web-apis.github.io/dist/assets/images/mutation-observer.svg',
  };

  persons = [new User('Roman', 'Sedov'), new User('Alex', 'Inkin')];

  pluralize: TuiPluralize = ['₽', '₽', '₽'];

  accounts = [
    new Account(
      '1',
      'Common',
      24876.55,
      TuiCurrency.Ruble,
      this.svgIcons.common
    ),
    new Account(
      '2',
      'Universal',
      335,
      TuiCurrency.Dollar,
      this.svgIcons.universal
    ),
    new Account(
      '3',
      'Intersection',
      10000,
      TuiCurrency.Euro,
      this.svgIcons.intersection
    ),
    new Account(
      '4',
      'Mutation',
      100,
      TuiCurrency.Pound,
      this.svgIcons.mutation
    ),
  ];

  testForm = new FormGroup({
    schoolName: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    province: new FormControl(
      { value: 'ลำปาง', disabled: true },
      Validators.required
    ),
    moneyValue: new FormControl('100', Validators.required),
    periodValue: new FormControl(new TuiDay(2017, 2, 15), Validators.required),
    timeValue: new FormControl(new TuiTime(12, 30), Validators.required),
    personValue: new FormControl(this.persons[0]),
    quantityValue: new FormControl(0, Validators.required),
    radioValue: new FormControl('with-commission'),
    accountWherefrom: new FormControl(null),
    accountWhere: new FormControl(null),
    checkboxValue: new FormControl(false),
    osnoValue: new FormControl(false),
    usnValue: new FormControl(false),
    eshnValue: new FormControl(false),
    envdValue: new FormControl(false),
    usn2Value: new FormControl(false),
    patentValue: new FormControl(false),
  });
}
