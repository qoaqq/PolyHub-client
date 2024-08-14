import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { 
  }

  getList(page: number = 1): Observable<any>{
    let params = new HttpParams()
    .set('page', page.toString())
    return this.http.get<any>('http://127.0.0.1:8000/api/movie',{ params });
  }

  searchMovies(title: string, page: number): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie-search?title=${title}`, { params });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie-categories`);
  }

  getMoviesByCategory(id : number, page: number): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    return this.http.get<any>(`http://127.0.0.1:8000/api/movies-by-category/${id}`, { params });
  }

  getTopMoviesInMonth(): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/top-movie-in-month`);
  }

  getMovieById(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/movie/${id}`);
  }

  getTopStories(){
    return this.http.get<any>(`http://127.0.0.1:8000/api/top-bogs`);
  }

  getHotBanner(){
    return this.http.get<any>(`http://localhost:8000/api/hot-banner`);
  }
}
