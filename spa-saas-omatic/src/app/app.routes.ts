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
    path: '**',
    redirectTo: 'home',
  },
];
