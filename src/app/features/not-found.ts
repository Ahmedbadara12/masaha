import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../core/language';
@Component({
  selector: 'not-found',
  imports: [RouterLink],
  template: `<section class="container not-found">
    <p class="eyebrow">404 / MASAHA</p>
    <h1>{{ l.text('هذه المساحة غير موجودة.', 'This space hasn’t been found.') }}</h1>
    <p>
      {{
        l.text(
          'قد يكون الرابط قد تغيّر. استكشف أعمالنا أو عُد للبداية.',
          'The link may have changed. Explore our projects or return to the beginning.'
        )
      }}
    </p>
    <a class="btn" routerLink="/">{{ l.text('العودة للرئيسية', 'Back to home') }} ↗</a>
  </section>`,
})
export class NotFound {
  l = inject(Language);
  constructor() {
    this.l.setTitle('الصفحة غير موجودة', 'Page not found');
  }
}
