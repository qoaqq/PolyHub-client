import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { 
  }

  getList(page: number = 1): Observable<any>{
    let params = new HttpParams()
    .set('page', page.toString())
    return this.http.get<any>(`${this.baseUrl}blog`,{ params });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog-categories`);
  }

  getBlogsByCategory(id : number, page: number): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
  
    return this.http.get<any>(`${this.baseUrl}blog-by-category/${id}`, { params });
  }


  getBlogById(blogId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog/${blogId}`);
  }

  getLatestBlogs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}blog-lastest`);
  }

  searchBlogs(title: string, page: number): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    return this.http.get<any>(`${this.baseUrl}blog-search?title=${title}`, { params });
  }
}