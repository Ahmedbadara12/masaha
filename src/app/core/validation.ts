import { AbstractControl, ValidationErrors } from '@angular/forms';
export function digits(value: string): string {
  return value.replace(/[٠-٩۰-۹]/g, (c) => String(c.charCodeAt(0) - (c <= '٩' ? 1632 : 1776)));
}
export function normalizePhone(value: string): string {
  return digits(value)
    .trim()
    .replace(/[\s()\-]/g, '');
}
export function nameValidator(c: AbstractControl): ValidationErrors | null {
  return String(c.value || '').trim().length >= 2 ? null : { name: true };
}
export function phoneValidator(c: AbstractControl): ValidationErrors | null {
  return /^\+?\d{7,15}$/.test(normalizePhone(String(c.value || ''))) ? null : { phone: true };
}
export function areaValidator(c: AbstractControl): ValidationErrors | null {
  const n = Number(
    digits(String(c.value || ''))
      .replace('٫', '.')
      .trim(),
  );
  return Number.isFinite(n) && n > 0 ? null : { area: true };
}
