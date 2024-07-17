import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { 
  }

  getList(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/movie');
  }

  searchMovies(title: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie-search?title=${title}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie-categories`);
  }

  getMoviesByCategory(id : number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movies-by-category/${id}`);
  }

  getTopMoviesInMonth(): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/top-movie-in-month`);
  }

  getMovieById(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie/${id}`);
  }

}
