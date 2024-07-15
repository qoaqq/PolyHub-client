import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopMovieService {
  private topMoviesUrl = 'http://localhost:8000/api/top-movie-in-month';
  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<any> { 
    return this.http.get(this.topMoviesUrl);
  }
}
