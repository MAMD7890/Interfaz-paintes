import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../interface/worker.model';

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
  workers: Worker[] = [];
  searchTerm = '';
  showModal = false;
  isEditing = false;
  currentWorker: Worker = {
    name: '',
    username: '',
    password: '',
    position: ''
  };

  constructor(private workerService: WorkerService) {}

  ngOnInit() {
    this.loadWorkers();
  }

  loadWorkers() {
    this.workerService.getWorkers().subscribe({
      next: (workers) => {
        this.workers = workers;
      },
      error: (error) => {
        console.error('Error fetching workers', error);
        // Opcional: mostrar mensaje de error al usuario
      }
    });
  }

  filteredWorkers() {
    if (!this.searchTerm) {
      return this.workers;
    }
    return this.workers.filter((worker) =>
      worker.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      worker.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openNewWorkerForm() {
    this.isEditing = false;
    this.currentWorker = {
      name: '',
      username: '',
      password: '',
      position: ''
    };
    this.showModal = true;
  }

  editWorker(worker: Worker) {
    this.isEditing = true;
    this.currentWorker = { ...worker }; // Copia del trabajador
    this.showModal = true;
  }

  deleteWorker(worker: Worker) {
    if (confirm('¿Estás seguro de eliminar este trabajador?')) {
      if (worker.idworker) {
        this.workerService.deleteWorker(worker.idworker).subscribe({
          next: () => {
            this.loadWorkers(); // Recargar lista después de eliminar
          },
          error: (error) => {
            console.error('Error deleting worker', error);
            // Opcional: mostrar mensaje de error al usuario
          }
        });
      }
    }
  }

  saveWorker() {
    if (this.isEditing && this.currentWorker.idworker) {
      // Actualizar trabajador existente
      this.workerService.updateWorker(this.currentWorker).subscribe({
        next: () => {
          this.loadWorkers();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating worker', error);
          // Opcional: mostrar mensaje de error al usuario
        }
      });
    } else {
      // Crear nuevo trabajador
      const { idworker, ...workerToCreate } = this.currentWorker;
      this.workerService.createWorker(workerToCreate).subscribe({
        next: () => {
          this.loadWorkers();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating worker', error);
          // Opcional: mostrar mensaje de error al usuario
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }
}