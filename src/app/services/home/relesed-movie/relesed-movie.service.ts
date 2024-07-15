import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelesedMovieService {
  private apiUrl = 'http://localhost:8000/api/home-movie';
  constructor(private http: HttpClient) { }
  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
