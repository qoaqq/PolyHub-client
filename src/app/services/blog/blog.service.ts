import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllBlogs(page: number = 1, perPage: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.http.get<any>(`${this.baseUrl}blog`, { params });
  }

  getBlogsByCategory(categoryId: number, page: number = 1, perPage: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.http.get<any>(`${this.baseUrl}getBlogByCategory/${categoryId}`, { params });
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog/${id}`);
  }

  getYearsAndCounts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getYearsAndCounts`);
  }

  getLatestBlogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog-home`);
  }

  getBlogsByYear(year: number, page: number = 1, perPage: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.http.get<any>(`${this.baseUrl}getBlogsByYear/${year}`, { params });
  }

  searchBlogs(search: string, page: number = 1, perPage: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.http.get<any>(`${this.baseUrl}searchBlogs`, { params });
  }
}