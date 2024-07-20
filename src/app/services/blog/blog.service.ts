import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getAllCategory`);
  }

  getAllBlogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog`);
  }

  getBlogsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getBlogByCategory/${categoryId}`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog/${id}`);
  }
}