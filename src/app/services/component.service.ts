import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviromen';
import { Stock } from '../interface/component.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  private baseUrl = environment.apiUrl+'/components';
  

  constructor(private http: HttpClient) {}

  getComponents(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }
  createComponent(component: Stock): Observable<any> {
    return this.http.post<Stock>(this.baseUrl, component);
  }

  updateComponent(id: number | undefined, componentDetails: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.baseUrl}/${id}`, componentDetails);
  }
  
  deleteComponent(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
