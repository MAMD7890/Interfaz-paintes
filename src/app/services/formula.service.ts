import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviromen';
import { Formula } from '../interface/formula.model';
import { FormulaWithArrayDTO } from '../interface/formula-with-array-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private baseUrl = `${environment.apiUrl}/formulas`;

  constructor(private http: HttpClient) {}

  createFormulaWithIngredients(
    formulaWithArrayDTO: FormulaWithArrayDTO
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl+"/create-with-ingredients", formulaWithArrayDTO, { headers });
  }
    // Obtener todas las fórmulas transformadas
    getAllFormulasTransformed(): Observable<FormulaWithArrayDTO[]> {
      return this.http.get<FormulaWithArrayDTO[]>(`${this.baseUrl}/all-transformed`);
    }

  // Obtener todas las fórmulas
  getAllFormulas(): Observable<Formula[]> {
    return this.http.get<Formula[]>(`${this.baseUrl}/`);
  }

  deleteFormulasByProductId(productId: number): Observable<void> {
    const url = `${this.baseUrl}/product/${productId}`;
    return this.http.delete<void>(url);
  }

  // Obtener una fórmula por su ID
  getFormulaById(id: number): Observable<Formula> {
    return this.http.get<Formula>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva fórmula
  createFormula(formula: Formula): Observable<Formula> {
    return this.http.post<Formula>(`${this.baseUrl}/create`, formula);
  }

  // Actualizar una fórmula existente
  updateFormula(id: number, formula: Formula): Observable<Formula> {
    return this.http.put<Formula>(`${this.baseUrl}/${id}`, formula);
  }

  // Eliminar una fórmula por su ID
  deleteFormula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener fórmulas por el ID del producto
  getFormulasByProduct(productId: number): Observable<Formula[]> {
    return this.http.get<Formula[]>(`${this.baseUrl}/product/${productId}`);
  }

  // Obtener fórmulas por el ID del componente
  getFormulasByComponent(componentId: number): Observable<Formula[]> {
    return this.http.get<Formula[]>(`${this.baseUrl}/component/${componentId}`);
  }
}
