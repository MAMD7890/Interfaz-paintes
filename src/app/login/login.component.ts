import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule si no está importado


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Asegúrate de que FormsModule esté importado
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Cambiado a styleUrls
})
export class loginComponent {
  usuario = '';
  contraseña = '';
  password: any;

  onSubmit() {
    // Lógica de autenticación aquí (por ejemplo, llamar a un servicio)
    console.log('usuario:', this.usuario);
    console.log('contraseña:', this.contraseña);
  }
}