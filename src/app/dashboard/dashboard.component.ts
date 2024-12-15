import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule], // Asegúrate de agregar FormsModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corregí "styleUrl" por "styleUrls"
})
export class DashboardComponent {
  usuario = {
    nombre: 'Danny Restrepo',
    email: 'juan.perez@ejemplo.com'
  };

  contrasena = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  guardarCambios() {
    // Lógica para guardar cambios del perfil
    console.log('Cambios guardados:', this.usuario);
  }

  cambiarContrasena() {
    if (this.contrasena.nueva === this.contrasena.confirmar) {
      console.log('Contraseña cambiada correctamente:', this.contrasena);
    } else {
      console.error('Error: Las contraseñas no coinciden.');
    }
  }
}
