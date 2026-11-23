import { Routes } from '@angular/router';

export const GUIDE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/guide/guide.component').then((m) => m.GuideComponent),
  },
];
