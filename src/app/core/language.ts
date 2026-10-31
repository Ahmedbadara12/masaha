import { inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Bilingual } from './models';
@Injectable({ providedIn: 'root' })
export class Language {
  private title = inject(Title);
  lang = signal<'ar' | 'en'>(localStorage.getItem('masaha-language') === 'en' ? 'en' : 'ar');
  page = signal<Bilingual>({ ar: 'الرئيسية', en: 'Home' });
  constructor() {
    this.update();
  }
  t(value: Bilingual) {
    return value[this.lang()];
  }
  text(ar: string, en: string) {
    return this.lang() === 'ar' ? ar : en;
  }
  toggle() {
    this.lang.update((x) => (x === 'ar' ? 'en' : 'ar'));
    localStorage.setItem('masaha-language', this.lang());
    this.update();
  }
  setTitle(ar: string, en: string) {
    this.page.set({ ar, en });
    this.update();
  }
  update() {
    document.documentElement.lang = this.lang();
    document.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
    this.title.setTitle(this.t(this.page()) + ' | ' + this.text('مساحة', 'Masaha'));
  }
}
