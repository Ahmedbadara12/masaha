import {
  LucideDraftingCompass,
  LucidePaintRoller,
  LucideHouse,
  LucideArrowUpRight,
} from '@lucide/angular';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../core/language';
import { bi } from '../core/models';
import { faqs, images, projects, services } from '../core/data';
import { ImageFallback, ProjectCard } from '../shared';
@Component({
  imports: [
    RouterLink,
    ImageFallback,
    ProjectCard,
    LucideDraftingCompass,
    LucidePaintRoller,
    LucideHouse,
    LucideArrowUpRight,
  ],
  template: ` <section class="hero">
      <img
        class="hero-photo"
        fallback
        [src]="hero"
        [alt]="
          l.text(
            'غرفة معيشة دافئة بخامات طبيعية وضوء الشمس',
            'Warm living room with natural materials and sunlight'
          )
        "
        width="1800"
        height="1100"
        fetchpriority="high"
      />
      <div class="hero-shade"></div>
      <div class="container hero-content">
        <p class="eyebrow light">
          <span></span
          >{{ l.text('تصميم داخلي · تشطيبات · تجديد', 'INTERIOR DESIGN · FINISHING · RENOVATION') }}
        </p>
        <h1>
          {{ l.text('مساحات تشبهك،', 'Spaces that feel like you,') }}<br /><em>{{
            l.text('من الفكرة للتسليم', 'from idea to reality.')
          }}</em>
        </h1>
        <p class="hero-description">
          {{
            l.text(
              'تصميم داخلي وتشطيبات مدروسة تحوّل احتياجك لمساحة عملية ومريحة.',
              'Thoughtful interior design and finishing that turn your needs into a practical, comfortable space.'
            )
          }}
        </p>
        <div class="hero-buttons">
          <a routerLink="/quote" class="btn cream"
            >{{ l.text('اطلب معاينة', 'Request an inspection') }}
            <span><svg lucideArrowUpRight /></span></a
          ><a routerLink="/projects" class="text-link light"
            >{{ l.text('استكشف أعمالنا', 'Explore our work') }}
            <span><svg lucideArrowUpRight /></span
          ></a>
        </div>
      </div>
      <div class="hero-bottom container">
        <span>MASAHA — {{ l.text('حيث تبدأ التفاصيل', 'WHERE DETAILS BEGIN') }}</span
        ><a href="#services">{{ l.text('اكتشف المساحة', 'DISCOVER MORE') }} ↓</a>
      </div>
    </section>
    <section id="services" class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 / {{ l.text('ما نقدمه', 'WHAT WE DO') }}</p>
          <h2>
            {{ l.text('لكل مساحة، بداية مدروسة.', 'Every space deserves a thoughtful start.') }}
          </h2>
        </div>
        <p>
          {{
            l.text(
              'من الفكرة الأولى إلى اللمسة الأخيرة، نرى الصورة كاملة ونهتم بكل تفصيلة.',
              'From the first idea to the final touch, we see the whole picture and care about every detail.'
            )
          }}
        </p>
      </div>
      <div class="service-grid">
        @for (s of services; track s.id) {
          <a class="service-card" routerLink="/services" [fragment]="s.id"
            ><div class="service-top">
              <span class="line-icon" aria-hidden="true">
                @switch (s.id) {
                  @case ('design') {
                    <svg lucideDraftingCompass />
                  }
                  @case ('finishing') {
                    <svg lucidePaintRoller />
                  }
                  @default {
                    <svg lucideHouse />
                  }
                }</span
              ><span>{{ s.num }}</span>
            </div>
            <h3>{{ l.t(s.title) }}</h3>
            <p>{{ l.t(s.desc) }}</p>
            <span class="text-link"
              >{{ l.text('اكتشف الخدمة', 'Discover the service') }}
              <span aria-hidden="true"><svg lucideArrowUpRight /></span></span
          ></a>
        }
      </div>
    </section>
    <section class="projects-section section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">02 / {{ l.text('أعمال مختارة', 'SELECTED WORK') }}</p>
            <h2>{{ l.text('أفكار أخذت مساحتها.', 'Ideas, given room to grow.') }}</h2>
          </div>
          <a class="text-link" routerLink="/projects"
            >{{ l.text('عرض كل الأعمال', 'View all projects') }}
            <span><svg lucideArrowUpRight /></span
          ></a>
        </div>
        <div class="project-grid">
          @for (p of featured; track p.id) {
            <project-card [project]="p" />
          }
        </div>
        <p class="demo-note">
          {{
            l.text(
              'مشاريع توضيحية لعرض التصميم، وليست أعمالًا منفذة للشركة.',
              'Illustrative projects for this demo, not completed company work.'
            )
          }}
        </p>
      </div>
    </section>
    <section class="section container process">
      <div class="section-heading">
        <div>
          <p class="eyebrow">03 / {{ l.text('رحلتنا معك', 'OUR PROCESS') }}</p>
          <h2>{{ l.text('خطوات واضحة. تفاصيل محسوبة.', 'Clear steps. Considered details.') }}</h2>
        </div>
        <p>
          {{
            l.text(
              'رحلة متكاملة، تبدأ بالاستماع وتنتهي بمساحة تشعر أنها لك.',
              'A considered journey, from listening to creating a place that feels like yours.'
            )
          }}
        </p>
      </div>
      <div class="process-grid">
        @for (step of steps; track $index) {
          <div>
            <span class="step-number">0{{ $index + 1 }}</span>
            <h3>{{ l.t(step[0]) }}</h3>
            <p>{{ l.t(step[1]) }}</p>
          </div>
        }
      </div>
    </section>
    <section class="faq-section section">
      <div class="container faq-layout">
        <div>
          <p class="eyebrow">04 / {{ l.text('قبل أن نبدأ', 'BEFORE WE BEGIN') }}</p>
          <h2>{{ l.text('أسئلة في بالك؟', 'A few things on your mind?') }}</h2>
          <p>
            {{
              l.text(
                'كل مساحة تبدأ بسؤال. هنا بعض الإجابات.',
                'Every space begins with a question. Here are a few answers.'
              )
            }}
          </p>
        </div>
        <div class="faq-list">
          @for (f of faqs; track $index) {
            <div class="faq-item">
              <h3>
                <button
                  (click)="open.set(open() === $index ? -1 : $index)"
                  [attr.aria-expanded]="open() === $index"
                  [attr.aria-controls]="'faq-' + $index"
                >
                  {{ l.t(f[0]) }}<span>{{ open() === $index ? '−' : '+' }}</span>
                </button>
              </h3>
              <div [id]="'faq-' + $index" [hidden]="open() !== $index">
                <p>{{ l.t(f[1]) }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    <section class="closing container">
      <div>
        <p class="eyebrow light">{{ l.text('لفكرتك مكان هنا', 'YOUR IDEA BELONGS HERE') }}</p>
        <h2>
          {{
            l.text('مساحتك القادمة، تبدأ بمحادثة.', 'Your next space starts with a conversation.')
          }}
        </h2>
        <p>
          {{
            l.text(
              'احكِ لنا عن مساحتك، ولنبدأ في تصور إمكانياتها.',
              'Tell us about your space. Let’s imagine its possibilities.'
            )
          }}
        </p>
      </div>
      <a class="btn cream" routerLink="/quote"
        >{{ l.text('اطلب معاينة', 'Request an inspection') }} <span><svg lucideArrowUpRight /></span
      ></a>
    </section>`,
})
export class Home {
  l = inject(Language);
  hero = images[0];
  services = services;
  featured = projects.filter((p) => p.featured);
  faqs = faqs;
  open = signal(-1);
  steps = [
    [
      bi('نفهم احتياجك', 'We listen'),
      bi(
        'نستمع لأفكارك ونفهم طريقة استخدامك للمكان.',
        'We understand your ideas and how you use your space.',
      ),
    ],
    [
      bi('نخطط ونصمم', 'We plan & design'),
      bi(
        'نحوّل الاحتياج لتوزيع عملي واتجاه بصري متكامل.',
        'We turn your needs into a practical layout and a coherent visual direction.',
      ),
    ],
    [
      bi('ننفذ ونتابع', 'We coordinate'),
      bi(
        'ننسق الأعمال ونتابع الخامات وجودة التفاصيل.',
        'We coordinate the work, materials and quality of the details.',
      ),
    ],
    [
      bi('نسلّم التفاصيل', 'We bring it together'),
      bi(
        'نراجع كل ركن لتكتمل المساحة كما تخيلناها معًا.',
        'We review every corner so the space comes together as imagined.',
      ),
    ],
  ];
  constructor() {
    this.l.setTitle('الرئيسية', 'Home');
  }
}
