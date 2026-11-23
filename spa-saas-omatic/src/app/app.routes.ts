import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers/customers.routes').then(
        (m) => m.CUSTOMERS_ROUTES
      ),
  },
  {
    path: 'simulations',
    loadChildren: () =>
      import('./modules/simulations/simulations.routes').then(
        (m) => m.SIMULATIONS_ROUTES
      ),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./modules/invoices/invoices.routes').then(
        (m) => m.INVOICES_ROUTES
      ),
  },
  {
    path: 'guide',
    loadChildren: () =>
      import('./modules/guide/guide.routes').then(
        (m) => m.GUIDE_ROUTES
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.routes').then(
        (m) => m.CONTACT_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
