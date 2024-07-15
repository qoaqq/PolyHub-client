import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogMovieService {
  private blogHomeUrl = 'http://localhost:8000/api/blog-home';
  constructor(private http: HttpClient) { }
  getBlogHome(): Observable<any> { 
    return this.http.get(this.blogHomeUrl);
  }
}
