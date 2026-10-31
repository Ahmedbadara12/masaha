import { LucideArrowUpRight } from '@lucide/angular';
import { Component, Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from './core/language';
import { Project } from './core/models';
@Directive({ selector: 'img[fallback]' })
export class ImageFallback {
  private el = inject(ElementRef<HTMLImageElement>);
  failed = false;
  ngAfterViewInit() {
    const img = this.el.nativeElement;
    if (
      img.src.includes('/images/interior-') &&
      !img.closest('dialog') &&
      !img.closest('.gallery-main')
    ) {
      img.srcset =
        img.getAttribute('src')!.replace('.jpg', '-800.jpg') +
        ' 800w, ' +
        img.getAttribute('src') +
        ' 1600w';
      img.sizes = img.closest('project-card')
        ? '(max-width: 480px) 100vw, (max-width: 767px) 50vw, 33vw'
        : '100vw';
    }
  }
  @HostListener('error') error() {
    if (this.failed) return;
    this.failed = true;
    this.el.nativeElement.removeAttribute('srcset');
    this.el.nativeElement.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#e6e3d9"/><path d="M400 600V250h400v350M500 600V350h200v250" fill="none" stroke="#626b4a" stroke-width="6"/></svg>',
      );
  }
}
@Component({
  selector: 'project-card',
  imports: [RouterLink, ImageFallback, LucideArrowUpRight],
  template: `<a
    class="project-card"
    [routerLink]="['/projects', project().slug]"
    [queryParams]="{ category: filter() || null }"
    ><div class="project-image">
      <img
        fallback
        [src]="project().cover"
        [alt]="l.t(project().gallery[0].alt)"
        width="800"
        height="650"
        loading="lazy"
      /><span class="image-arrow" aria-hidden="true"><svg lucideArrowUpRight /></span>
    </div>
    <div class="project-line">
      <h3>{{ l.t(project().title) }}</h3>
      <span>{{ project().areaSqm }} {{ l.text('م²', 'm²') }}</span>
    </div>
    <p>{{ category(project().category) }}</p></a
  >`,
})
export class ProjectCard {
  l = inject(Language);
  project = input.required<Project>();
  filter = input('');
  category(c: string) {
    return this.l.text(
      c === 'apartment' ? 'سكني · شقة' : c === 'office' ? 'تجاري · مكتب' : 'تجاري · متجر',
      c === 'apartment'
        ? 'Residential · Apartment'
        : c === 'office'
          ? 'Commercial · Office'
          : 'Commercial · Retail',
    );
  }
}
