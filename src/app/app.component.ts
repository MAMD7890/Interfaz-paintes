import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importar Router y NavigationEnd
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf
import { RouterModule } from '@angular/router'; // Importar RouterModule para router-outlet
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';

import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Para *ngIf y otras directivas estructurales
    RouterModule, // Para router-outlet
    LeftSidebarComponent,
    MainComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  showSidebar = signal<boolean>(true); // Control para mostrar u ocultar el menú lateral

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);

    // Detectar cambios en la ruta para ocultar el menú en login
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebar.set(event.url !== '/login'); // Oculta el menú si la ruta es /login
      }
    });
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
