import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpcomingMovieService {
  private upcomingMovieUrl = 'http://localhost:8000/api/upcoming-movie';
  constructor(private http: HttpClient) { }
  getUpComingMovie(): Observable<any> { 
    return this.http.get(this.upcomingMovieUrl);
  }
}
