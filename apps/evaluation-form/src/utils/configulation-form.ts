import { AbstractControl } from '@angular/forms';

export type ConfigurationForm<T> = Partial<Record<keyof T, AbstractControl>>;
