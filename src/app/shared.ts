import {Component, Directive, ElementRef, HostListener, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Language} from './core/language';
import {Project} from './core/models';
@Directive({selector:'img[fallback]'})
export class ImageFallback {private el=inject(ElementRef<HTMLImageElement>);@HostListener('error') error(){this.el.nativeElement.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#e6e3d9"/><path d="M400 600V250h400v350M500 600V350h200v250" fill="none" stroke="#626b4a" stroke-width="6"/></svg>');}}
@Component({selector:'project-card',imports:[RouterLink,ImageFallback],template:`<a class="project-card" [routerLink]="['/projects',project().slug]" [queryParams]="{category:filter() || null}"><div class="project-image"><img fallback [src]="project().cover" [alt]="l.t(project().gallery[0].alt)" width="800" height="650" loading="lazy"><span class="image-arrow" aria-hidden="true">↗</span></div><div class="project-line"><h3>{{l.t(project().title)}}</h3><span>{{project().areaSqm}} {{l.text('م²','m²')}}</span></div><p>{{category(project().category)}}</p></a>`})
export class ProjectCard {l=inject(Language);project=input.required<Project>();filter=input('');category(c:string){return this.l.text(c==='apartment'?'سكني · شقة':c==='office'?'تجاري · مكتب':'تجاري · متجر',c==='apartment'?'Residential · Apartment':c==='office'?'Commercial · Office':'Commercial · Retail');}}
