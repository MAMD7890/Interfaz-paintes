import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user.model';
import { RegisterRequest, Role } from '../interface/registerRequest.model';
import { AuthResponse } from '../interface/AuthResponse.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  isModalVisible: boolean = false; // Variable para controlar la visibilidad del modal
 username: string = '';
 lastname: string = '';
 firstname: string = '';
 password: string = '';
 role: string = '';  
 errorMessage: string = '';  
 successMessage: string = '';  


  user: RegisterRequest[] = [];
  searchTerm = '';
  showModal = false;
  isEditing = false;
  currentUser: RegisterRequest = {
    role: Role.USER,
    username: '',
    lastname: '',
    firstname: '',
    password: '',
    id: 0
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.user = users;
      },
      error: (error) => {
        console.error('Error fetching workers', error);
      }
    });
  }

  filteredUsers() {
    if (!this.searchTerm) {
      return this.user;
    }
    return this.user.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openNewUsersForm() {
    this.isEditing = false;
    this.currentUser = {
      role:Role.USER,
    username: '',
    lastname: '',
    firstname:'',
    password: '',
    id: 0
    };
    this.showModal = true;
  }

  editUser(user: RegisterRequest) {
    this.isEditing = true;
    this.currentUser = { ...user }; // Copia del trabajador
    this.showModal = true;
  }

  deleteUser(user: RegisterRequest) {
    if (confirm('¿Estás seguro de eliminar este trabajador?')) {
      if (user.id) {
        this.authService.deleteUser(user.id).subscribe({
          next: () => {
            this.loadUsers(); // Recargar lista después de eliminar
          },
          error: (error) => {
            console.error('Error deleting worker', error);
            // Opcional: mostrar mensaje de error al usuario
          }
        });
      }
    }
  }
  closeModal(): void {
    this.showModal = false;
  }
  closeCreateModal(): void{
    this.showModal= false;

  }

    // Método para registrar al usuario
    register(): void {
      const newUser: RegisterRequest = {
        username: this.currentUser.username,
        lastname: this.currentUser.lastname,
        firstname: this.currentUser.firstname,
        password: this.currentUser.password,
        role: this.role==="admin"?Role.ADMIN:Role.USER
      };
      
  
      this.authService.register(newUser).subscribe({
        next: (response: AuthResponse) => {
          this.successMessage = 'Usuario registrado con éxito.';
          this.closeCreateModal();
          this.loadUsers();
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
          console.error(err);
        }
      });
    }
  }
