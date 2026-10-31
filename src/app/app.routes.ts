import { Routes } from '@angular/router';

export const routes: Routes = [
 {path:'',loadComponent:()=>import('./features/home').then(m=>m.Home)},
 {path:'services',loadComponent:()=>import('./features/services').then(m=>m.Services)},
 {path:'projects',loadComponent:()=>import('./features/projects').then(m=>m.Projects)},
 {path:'projects/:slug',loadComponent:()=>import('./features/project-details').then(m=>m.ProjectDetails)},
 {path:'quote',loadComponent:()=>import('./features/quote').then(m=>m.Quote)},
 {path:'**',loadComponent:()=>import('./features/not-found').then(m=>m.NotFound)}
];
