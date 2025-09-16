import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Schools } from './components/schools/schools';
import { SchoolClass } from './components/school-class/school-class';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'escolas', component: Schools },
      { path: 'turmas', component: SchoolClass }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];
