import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Packing } from '../interface/Packing.model';
import { environment } from '../enviroment/enviromen';

@Injectable({
  providedIn: 'root',
})
export class PackingService {
    private baseUrl = environment.apiUrl+'/packings';

  constructor(private http: HttpClient) {}


  getAllPackings(): Observable<Packing[]> {
    return this.http.get<Packing[]>(this.baseUrl);
  }

  getPackingById(id: number): Observable<Packing> {
    return this.http.get<Packing>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo packing
   * @param packing Objeto Packing a crear
   */
  createPacking(packing: Packing[]): Observable<Packing[]> {
    return this.http.post<Packing[]>(this.baseUrl, packing);
  }

  /**
   * Actualiza un packing existente
   * @param id ID del packing
   * @param packing Objeto Packing con los nuevos datos
   */
  updatePacking(id: number, packing: Packing): Observable<Packing> {
    return this.http.put<Packing>(`${this.baseUrl}/${id}`, packing);
  }

  /**
   * Elimina un packing por su ID
   * @param id ID del packing
   */
  deletePacking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
