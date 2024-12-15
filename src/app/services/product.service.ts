import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.model';
import { environment } from '../enviroment/enviromen';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Base API URL - replace with your actual backend URL
    private baseUrl = environment.apiUrl+'/products';

  constructor(private http: HttpClient) {}

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Upload image for a specific product
  uploadImage(file: File, productId: number | undefined): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Product>(`${this.baseUrl}/upload/${productId}`, formData);
  }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}