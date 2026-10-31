import { Component, inject } from '@angular/core';
import { Language } from './core/language';

@Component({
  selector: 'brand-loading',
  template: `<div class="brand-loader" role="status" aria-live="polite">
    <div class="loader-lockup">
      <div class="brand" aria-hidden="true">
        <span class="brand-mark"></span><span><b>مساحة</b><small>MASAHA</small></span>
      </div>
      <div class="loader-track" aria-hidden="true"><span></span></div>
      <p>{{ l.text('نجهّز لك المساحة…', 'Preparing your space…') }}</p>
    </div>
  </div>`,
})
export class BrandLoading {
  l = inject(Language);
}
