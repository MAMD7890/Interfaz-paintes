import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackagingType } from '../interface/PackagingType.model';
import { environment } from '../enviroment/enviromen';

@Injectable({
  providedIn: 'root',
})
export class PackagingTypeService {
    private baseUrl = environment.apiUrl+'/packaging-types';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los tipos de empaque
   */
  getAllPackagingTypes(): Observable<PackagingType[]> {
    return this.http.get<PackagingType[]>(this.baseUrl);
  }

  /**
   * Obtiene un tipo de empaque por su ID
   * @param id ID del tipo de empaque
   */
  getPackagingTypeById(id: number): Observable<PackagingType> {
    return this.http.get<PackagingType>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo tipo de empaque
   * @param packagingType Objeto PackagingType a crear
   */
  createPackagingType(packagingType: PackagingType): Observable<PackagingType> {
    return this.http.post<PackagingType>(this.baseUrl, packagingType);
  }

  /**
   * Actualiza un tipo de empaque existente
   * @param id ID del tipo de empaque
   * @param packagingType Objeto PackagingType con los nuevos datos
   */
  updatePackagingType(id: number, packagingType: PackagingType): Observable<PackagingType> {
    return this.http.put<PackagingType>(`${this.baseUrl}/${id}`, packagingType);
  }

  /**
   * Elimina un tipo de empaque por su ID
   * @param id ID del tipo de empaque
   */
  deletePackagingType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
