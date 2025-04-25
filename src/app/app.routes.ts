import { Routes } from '@angular/router';
import { projectGuard } from './shared/guards/project.guard';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [projectGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage),
    canActivate: [projectGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [loginGuard]
  },
];
