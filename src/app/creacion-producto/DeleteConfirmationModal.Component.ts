// delete-confirmation-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Confirmar eliminación</h2>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar el producto "{{ itemName }}"?</p>
            <p class="text-muted">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" (click)="onCancel()">Cancelar</button>
            <button class="btn-delete" (click)="onConfirm()">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-dialog {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-content {
      padding: 20px;
    }

    .modal-header {
      margin-bottom: 15px;
    }

    .modal-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }

    .modal-body {
      margin-bottom: 20px;
    }

    .modal-body p {
      margin: 0 0 10px;
      color: #2c3e50;
    }

    .text-muted {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn-cancel {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-delete {
      padding: 8px 16px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-delete:hover {
      background: #c82333;
    }

    .btn-cancel:hover {
      background: #f8f9fa;
    }
  `]
})
export class DeleteConfirmationModalComponent {
  @Input() show = false;
  @Input() itemName = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}