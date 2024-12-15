import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fal fa-user',
      label: 'Perfil',
    },
    {
      routeLink: 'products',
      icon: 'fal fa-box-open',
      label: 'Productos',
    },
    {
      routeLink: 'inventario',
      icon: 'fal fa-box',
      label: 'Componentes',
    },
    {
      routeLink: 'creacion-producto',
      icon: 'fal fa-cube',
      label: 'crear producto',
    },
    {
      routeLink: 'formula',
      icon: 'fal fa-cube',
      label: 'crear formula',
    },
    {
      routeLink: 'pages',
      icon: 'fal fa-file',
      label: 'Informe de produccion',
    },
    {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'configuracion',
    },
    
    
    
    
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
