import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'], // Corrige la propiedad "styleUrl" a "styleUrls"
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Simula el cierre de sesión (redirige al login como acción visual)
    console.log('Sesión cerrada (simulación)');
    this.router.navigate(['/login']); // Navegación simulada
  }
}