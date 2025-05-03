import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { LayoutService } from './servicies/layout.service';
import { ILayout } from './interfaces/ILayout';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonLabel, CommonModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  isSidebarOpen = false;
  allowedPaths: string[] = [];

  constructor(private router: Router, private tapsService: LayoutService) {}

  ngOnInit(): void {
    this.tapsService.getUserInfo().subscribe(
      (response: ILayout) => {
        console.log('Respuesta del servicio:', response);
        this.allowedPaths = response.paths || [];
        console.log('Paths permitidos:', this.allowedPaths);

        // Mapeo entre paths permitidos y rutas internas de cada tab
        const allowedMapping: { [key: string]: string } = {
          '/layout/dashboard': '/tabs/tab1',
          '/layout/users': '/tabs/tab2',
          '/layout/rol-modules': '/tabs/tab3',
          '/layout/borrower': '/tabs/tab4',
          '/layout/lender': '/tabs/tab5',
        };

        // Si la URL actual es base de tabs, redirige a la primera vista permitida
        if (this.router.url === '/tabs' || this.router.url === '/tabs/') {
          for (const key of Object.keys(allowedMapping)) {
            if (this.allowedPaths.includes(key)) {
              const route = allowedMapping[key];
              console.log('Redirigiendo a:', route);
              this.router.navigate([route]);
              break;
            }
          }
        }
      },
      (error) => {
        console.error('Error al obtener los paths:', error);
      }
    );
  }

  ionViewWillEnter() {
    this.tapsService.getUserInfo().subscribe(
      (response: ILayout) => {
        console.log('Respuesta del servicio:', response);
        this.allowedPaths = response.paths || [];
        console.log('Paths permitidos:', this.allowedPaths);

        const allowedMapping: { [key: string]: string } = {
          '/layout/dashboard': '/tabs/tab1',
          '/layout/users': '/tabs/tab2',
          '/layout/rol-modules': '/tabs/tab3',
          '/layout/borrower': '/tabs/tab4',
          '/layout/lender': '/tabs/tab5',
        };

        if (this.router.url === '/tabs' || this.router.url === '/tabs/') {
          for (const key of Object.keys(allowedMapping)) {
            if (this.allowedPaths.includes(key)) {
              const route = allowedMapping[key];
              this.router.navigate([route]);
              break;
            }
          }
        }
      },
      (error) => {
        console.error('Error al obtener los paths:', error);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);
  }

  isPathAllowed(path: string): boolean {
    return this.allowedPaths.includes(path);
  }
}
