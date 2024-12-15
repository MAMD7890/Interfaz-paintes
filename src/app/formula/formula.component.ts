import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ComponentsService } from '../services/component.service';
import { Stock } from '../interface/component.model';
import { Product } from '../interface/product.model';
import { FormulaWithArrayDTO } from '../interface/formula-with-array-dto.model';
import { IngredientDTO } from '../interface/ingredient-dto.model';
import { FormulaService } from '../services/formula.service';

@Component({
  selector: 'app-formula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
})
export class FormulaComponent {
  productos: FormulaWithArrayDTO[] = [];

  producto: Product[] = [
  ];
  ingredientes: IngredientDTO[] = [
  ];

  formula: FormulaWithArrayDTO = {
    producto: 0, 
    ingredientes: [] 
  };

  isLoading = false;
  errorMessage: string | null = null;
  selectComponent: string ="";
  formulas: FormulaWithArrayDTO[] = [];

  selectedProducto?: number;
  editingFormulaIndex: number | null = null;
  isModalOpen = false;
  busqueda: string = '';

  componentes: Stock[] = [
    // Agrega más componentes según sea necesario
  ];
    constructor(private productService: ProductService, private componentService: ComponentsService, private formulaService: FormulaService) {}
  

  // Abre el modal para agregar o editar una fórmula
  abrirModal(isEditMode: boolean = false) {
    this.isModalOpen = true;

    if (!isEditMode) {
      // Sólo reinicia las variables si no es en modo de edición
      this.selectedProducto = 0;
      this.ingredientes = [];
      this.editingFormulaIndex = null;
    }
  }
  ngOnInit(){
    this.getComponents();
    this.getProducts();
    this.getRecipe();
  }
  getProducts(){
    this.productService.getAllProducts().subscribe({
      next: (productos) => {
        this.producto= productos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'No se pudieron cargar los productos. Intente nuevamente.';
        this.isLoading = false;
        console.error('Error al cargar productos', error);
      }
    });
  }
  getRecipe() {
    this.formulaService.getAllFormulasTransformed().subscribe({
      next: (formulasTransformed) => {
        this.formulas = formulasTransformed; // Asigna los datos a la propiedad 'formulas'
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'No se pudieron cargar las fórmulas transformadas. Intente nuevamente.';
        this.isLoading = false;
        console.error('Error al cargar fórmulas transformadas', error);
      }
    });
  }
  
  getComponents(){
    this.componentService.getComponents().subscribe({
      next: (productos) => {
        this.componentes = productos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'No se pudieron cargar los productos. Intente nuevamente.';
        this.isLoading = false;
        console.error('Error al cargar productos', error);
      }
    });
  }
  // Cierra el modal
  cerrarModal() {
    this.isModalOpen = false;
    this.selectedProducto = 0;
    this.ingredientes = [];
    this.editingFormulaIndex = null;
  }

  // Agrega un nuevo ingrediente al formulario
  agregarIngrediente() {
    this.ingredientes.push({ nombre: 0, name:'', cantidad: 0, unidad: '' });
  }

  // Elimina un ingrediente del formulario
  eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }


  guardarFormula() {
  
 console.log(this.ingredientes)
 console.log(this.selectedProducto)
 console.log(this.selectComponent)
 this.formula.producto = this.selectedProducto != null? this.selectedProducto:0;
 this.formula.ingredientes=this.ingredientes;

 console.log(this.formula)
 this.formulaService.createFormulaWithIngredients(this.formula).subscribe({
  next: (productos:any) => {
    console.log(productos)
    this.cerrarModal()
    this.getRecipe()
  },
  error: (error:any) => {
    this.errorMessage = 'No se pudieron cargar los productos. Intente nuevamente.';
    this.isLoading = false;
    console.error('Error al cargar productos', error);
  }
});
}

editarFormula(productos: FormulaWithArrayDTO) {
  console.log(this.ingredientes);
  console.log(this.selectedProducto);
  console.log(this.selectComponent);
  this.isModalOpen=true;
  this.selectedProducto = productos.producto;
  this.ingredientes = productos.ingredientes;
}
eliminarFormula(productId: number) {
  if (confirm('¿Estás seguro de que deseas eliminar esta fórmula?')) {
    this.formulaService.deleteFormulasByProductId(productId).subscribe({
      next: () => {
        console.log(`Fórmula con ID ${productId} eliminada exitosamente.`);
        this.getRecipe(); // Actualiza la lista de fórmulas después de la eliminación
        alert('La fórmula ha sido eliminada correctamente.');
      },
      error: (error) => {
        this.errorMessage = 'No se pudo eliminar la fórmula. Intente nuevamente.';
        console.error('Error al eliminar la fórmula', error);
        alert('Ocurrió un error al eliminar la fórmula.');
      }
    });
  }
}

  

  // Filtra las fórmulas por nombre del producto
  filtrarFormulas() {
    return  this.formulas;
  }
}
