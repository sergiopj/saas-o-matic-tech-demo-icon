import { Routes } from '@angular/router';

export const ASSISTANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/assistant/assistant.component').then(
        (m) => m.AssistantComponent
      ),
  },
];
