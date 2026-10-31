import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../core/language';
import { projects } from '../core/data';
import { ProjectCard } from '../shared';
import { bi } from '../core/models';
@Component({
  imports: [ProjectCard],
  template: `<section class="container page-intro">
      <p class="eyebrow">{{ l.text('معرض الأعمال', 'THE PROJECT COLLECTION') }}</p>
      <h1>{{ l.text('لكل مساحة، حكاية.', 'Every space has a story.') }}</h1>
      <p>
        {{
          l.text(
            'تصوّرات سكنية وتجارية تستكشف العلاقة بين الإنسان والمكان.',
            'Residential and commercial concepts exploring the relationship between people and place.'
          )
        }}
      </p>
    </section>
    <section class="container projects-page">
      <div class="filter-bar">
        <div class="filters">
          @for (c of categories; track c.id) {
            <button
              [class.selected]="filter() === c.id"
              [attr.aria-pressed]="filter() === c.id"
              (click)="select(c.id)"
            >
              {{ l.t(c.title) }}
            </button>
          }
        </div>
        <span aria-live="polite">{{ filtered().length }} {{ l.text('مشروعات', 'projects') }}</span>
      </div>
      <div class="project-grid">
        @for (p of filtered(); track p.id) {
          <project-card [project]="p" [filter]="filter()" />
        }
      </div>
      <p class="demo-note">
        {{
          l.text(
            'جميع المشروعات والمدد تصوّرية لأغراض العرض. الصور توضيحية وليست أعمالًا منفذة للشركة.',
            'All projects and durations are illustrative demo content. Stock photography does not depict completed company work.'
          )
        }}
      </p>
    </section>`,
})
export class Projects {
  l = inject(Language);
  route = inject(ActivatedRoute);
  router = inject(Router);
  filter = signal('');
  filtered = computed(() => projects.filter((p) => !this.filter() || p.category === this.filter()));
  categories = [
    { id: '', title: bi('الكل', 'All') },
    { id: 'apartment', title: bi('شقق', 'Apartments') },
    { id: 'office', title: bi('مكاتب', 'Offices') },
    { id: 'retail', title: bi('محلات', 'Retail') },
  ];
  constructor() {
    this.l.setTitle('أعمالنا', 'Projects');
    this.route.queryParamMap.subscribe((q) =>
      this.filter.set(
        ['apartment', 'office', 'retail'].includes(q.get('category') || '')
          ? q.get('category')!
          : '',
      ),
    );
  }
  select(id: string) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { category: id || null } });
  }
}
