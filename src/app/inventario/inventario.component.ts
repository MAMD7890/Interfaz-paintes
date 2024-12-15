import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Stock } from '../interface/component.model';
import { ComponentsService } from '../services/component.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventory = [
    { name: 'T1', stock: 100, minStock: 50, unit: 'Gramos' },
    { name: 'P2', stock: 150, minStock: 75, unit: 'kilogramos' }
  ];

  componentes: any[] = [];
  searchTerm: string = ''; // Propiedad para la barra de búsqueda

  selectedItem: Stock = { name: '', quantity: 0, currentStock: '', minimumStock: '', unitOfMeasurement: '' };
  showCreateModal = false;
  stock: Stock = { name: '', quantity: 0, currentStock: '', minimumStock: '', unitOfMeasurement: '' };
  newChemical = { name: '', quantity: '', currentStock: '', minimumStock: '', unitOfMeasurement: '' };

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 5; // Número de productos por página

  constructor(private componentsService: ComponentsService) {}

  ngOnInit(): void {
    this.fetchComponents();
  }

  get paginatedComponents(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.getFilteredComponents().slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.getFilteredComponents().length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getFilteredComponents(): any[] {
    if (!this.searchTerm) {
      return this.componentes;
    }
    const term = this.searchTerm.toLowerCase();
    return this.componentes.filter(item =>
      item.name.toLowerCase().includes(term)
    );
  }

  editStock(item: any) {
    this.selectedItem = item;
  }

  saveStockProduct(): void {
    this.componentsService.createComponent(this.stock).subscribe(
      (response) => {
        console.log('Component created:', response);
        this.closeCreateModal();
        this.fetchComponents();
      },
      (error) => {
        console.error('Error creating component:', error);
      }
    );
    this.closeCreateModal();    
  }

  updateStockProduct(): void {
    this.componentsService.updateComponent(this.selectedItem.idcomponent, this.selectedItem).subscribe(
      (response) => {
        console.log('Component updated:', response);
        this.closeCreateModal();
        this.fetchComponents();
      },
      (error) => {
        console.error('Error updating component:', error);
      }
    );
    this.closeModal();    
  }

  deleteStockProduct(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este componente?')) {
      return; 
    }
  
    this.componentsService.deleteComponent(id).subscribe(
      () => {
        console.log(`Component with ID ${id} deleted successfully.`);
        this.fetchComponents(); 
      },
      (error) => {
        console.error('Error deleting component:', error);
        alert('Error al eliminar el componente. Por favor intenta de nuevo.');
      }
    );
  }
  
  closeModal() {
    this.selectedItem = { name: '', quantity: 0, currentStock: '', minimumStock: '', unitOfMeasurement: '' };
  }

  deleteChemical(item: any) {
    this.inventory = this.inventory.filter(chemical => chemical !== item);
  }

  addChemical() {
    console.log(this.stock);
    if (this.newChemical.name && this.newChemical.quantity) {
      this.inventory.push({
        ...this.newChemical,
        name: '',
        stock: 0,
        minStock: 0,
        unit: ''
      });
      this.closeCreateModal();
    }
  }

  closeCreateModal() {
    this.newChemical = { name: '', quantity: '', currentStock: '', minimumStock: '', unitOfMeasurement: '' };
    this.showCreateModal = false;
  }

  resetNewChemical() {
    this.newChemical = { name: '', quantity: '', currentStock: '', minimumStock: '', unitOfMeasurement: '' };
  }

  openCreateModal() {
    this.showCreateModal = true;
    this.resetNewChemical();
  }

  fetchComponents(): void {
    this.componentsService.getComponents().subscribe(
      (data) => {
        this.componentes = data;
        console.log(this.componentes);
      },
      (error) => {
        console.error('Error fetching components:', error);
      }
    );
  }

  filterData() {
    console.log('Buscando componentes:', this.searchTerm);
  }
}