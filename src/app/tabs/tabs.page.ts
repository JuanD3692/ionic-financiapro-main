import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
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

        // Redirigir al primer módulo permitido
        if (this.allowedPaths.length > 0) {
          const firstPath = this.allowedPaths[0];
          console.log('Redirigiendo a:', firstPath);
          this.router.navigate([firstPath]);
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
