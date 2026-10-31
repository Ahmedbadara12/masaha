import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../core/language';
import { services } from '../core/data';
import { ImageFallback } from '../shared';
@Component({
  imports: [RouterLink, ImageFallback],
  template: `<div class="container page-intro">
      <p class="eyebrow">{{ l.text('خدمات مساحة', 'MASAHA SERVICES') }}</p>
      <h1>
        {{
          l.text('من رؤية واضحة، إلى مساحة متكاملة.', 'From a clear vision to a complete space.')
        }}
      </h1>
      <p>
        {{
          l.text(
            'ثلاث خدمات، واهتمام واحد: أن تعمل المساحة من أجلك.',
            'Three services, one purpose: making your space work for you.'
          )
        }}
      </p>
    </div>
    <div class="container">
      @for (s of services; track s.id) {
        <section class="service-detail" [id]="s.id">
          <img
            fallback
            [src]="s.image"
            [alt]="l.t(s.title)"
            width="900"
            height="750"
            loading="lazy"
          />
          <div>
            <p class="eyebrow">{{ s.num }} / MASAHA</p>
            <h2>{{ l.t(s.title) }}</h2>
            <p>{{ l.t(s.desc) }}</p>
            <ul>
              @for (item of s.items; track $index) {
                <li>{{ l.t(item) }}</li>
              }
            </ul>
            <a class="btn" routerLink="/quote" [queryParams]="{ service: s.id }"
              >{{ l.text('اطلب هذه الخدمة', 'Request this service') }} ↗</a
            >
          </div>
        </section>
      }
    </div>`,
})
export class Services {
  l = inject(Language);
  services = services;
  constructor() {
    this.l.setTitle('خدماتنا', 'Services');
  }
}
