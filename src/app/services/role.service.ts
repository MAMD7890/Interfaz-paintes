import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interface/role.model';
import { environment } from '../enviroment/enviromen';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private baseUrl = environment.apiUrl+'/roles';

  constructor(private http: HttpClient) { }

  // Get all roles
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  // Get role by ID
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  // Create a new role
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role);
  }

  // Update an existing role
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${role.id}`, role);
  }

  // Delete a role
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}