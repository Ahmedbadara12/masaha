import { LucideMenu, LucideLanguages, LucideArrowUpRight } from '@lucide/angular';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import {
  NavigationStart,
  NavigationCancel,
  NavigationError,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Language } from './core/language';
import { BrandLoading } from './loading';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideMenu,
    LucideLanguages,
    LucideArrowUpRight,
    BrandLoading,
  ],
  template: ` @if (startupLoading() || routeLoading()) {
      <brand-loading />
    }
    <a class="skip" href="#main">{{ l.text('تخطَّ إلى المحتوى', 'Skip to content') }}</a>
    <header (keydown.escape)="closeMenu()">
      <div class="container header-inner">
        <a
          routerLink="/"
          class="brand"
          [attr.aria-label]="l.text('مساحة — الرئيسية', 'Masaha — Home')"
          ><span class="brand-mark" aria-hidden="true">◰</span
          ><span><b>مساحة</b><small>MASAHA</small></span></a
        >
        <nav class="desktop-nav" [attr.aria-label]="l.text('القائمة الرئيسية', 'Main navigation')">
          <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active">{{
            l.text('الرئيسية', 'Home')
          }}</a
          ><a routerLink="/services" routerLinkActive="active">{{
            l.text('خدماتنا', 'Services')
          }}</a
          ><a routerLink="/projects" routerLinkActive="active">{{
            l.text('أعمالنا', 'Projects')
          }}</a>
        </nav>
        <div class="header-actions">
          <button
            class="language"
            (click)="l.toggle()"
            [attr.aria-label]="l.text('Switch to English', 'التبديل للعربية')"
          >
            <svg lucideLanguages /> <span>{{ l.text('EN', 'AR') }}</span></button
          ><a class="btn small desktop-cta" routerLink="/quote"
            >{{ l.text('اطلب معاينة', 'Request an inspection') }}
            <span aria-hidden="true"><svg lucideArrowUpRight /></span></a
          ><button
            id="menu-toggle"
            class="menu-toggle"
            (click)="menu.set(!menu())"
            [attr.aria-expanded]="menu()"
            aria-controls="mobile-nav"
            [attr.aria-label]="l.text('فتح القائمة', 'Toggle navigation')"
          >
            <svg lucideMenu />
          </button>
        </div>
      </div>
      @if (menu()) {
        <nav id="mobile-nav" class="mobile-nav" (click)="closeMenu()">
          <a routerLink="/">{{ l.text('الرئيسية', 'Home') }}</a
          ><a routerLink="/services">{{ l.text('خدماتنا', 'Services') }}</a
          ><a routerLink="/projects">{{ l.text('أعمالنا', 'Projects') }}</a
          ><a routerLink="/quote">{{ l.text('اطلب معاينة', 'Request an inspection') }}</a>
        </nav>
      }
    </header>
    <main id="main" tabindex="-1" [attr.aria-busy]="startupLoading() || routeLoading()">
      <router-outlet />
    </main>
    <footer>
      <div class="container footer-grid">
        <a routerLink="/" class="brand"
          ><span class="brand-mark">◰</span><span><b>مساحة</b><small>MASAHA</small></span></a
        >
        <p>
          {{
            l.text('نصمم مساحات تُعاش، وتفاصيل تبقى.', 'Spaces to live in. Details to live with.')
          }}
        </p>
        <nav>
          <a routerLink="/services">{{ l.text('خدماتنا', 'Services') }}</a
          ><a routerLink="/projects">{{ l.text('أعمالنا', 'Projects') }}</a
          ><a routerLink="/quote">{{ l.text('ابدأ مشروعك', 'Start your project') }}</a>
        </nav>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 MASAHA</span
        ><span>{{
          l.text(
            'موقع تجريبي لعرض المهارات — لا يمثل شركة فعلية',
            'Portfolio demo — does not represent a real company'
          )
        }}</span
        ><span>{{ l.text('مساحة لفكرة جديدة.', 'Room for a new idea.') }}</span>
      </div>
    </footer>
    <a class="mobile-bottom btn" [class.hidden]="quote()" routerLink="/quote"
      >{{ l.text('اطلب معاينة لمساحتك', 'Request an inspection') }}
      <span><svg lucideArrowUpRight /></span
    ></a>`,
})
export class App {
  l = inject(Language);
  router = inject(Router);
  menu = signal(false);
  quote = signal(false);
  startupLoading = signal(true);
  routeLoading = signal(true);
  constructor() {
    afterNextRender(() => {
      // Wait for local typography, without imposing an artificial splash delay.
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]).finally(() => this.startupLoading.set(false));
    });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) this.routeLoading.set(true);
      if (e instanceof NavigationCancel || e instanceof NavigationError)
        this.routeLoading.set(false);
      if (e instanceof NavigationEnd) {
        this.routeLoading.set(false);
        this.menu.set(false);
        this.quote.set(e.urlAfterRedirects.startsWith('/quote'));
      }
    });
  }
  closeMenu() {
    this.menu.set(false);
    document.getElementById('menu-toggle')?.focus();
  }
}
