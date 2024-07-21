import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8000/api/home-movie';
  private topMoviesUrl = 'http://localhost:8000/api/top-movie-in-month';
  private imageUrl = 'http://localhost:8000/api/image';
  private upcomingMovieUrl = 'http://localhost:8000/api/upcoming-movie';
  private blogHomeUrl = 'http://localhost:8000/api/blog-home';
  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<any> { 
    return this.http.get(this.topMoviesUrl);
  }
  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  getImage(): Observable<any> { 
    return this.http.get(this.imageUrl);
  }
  getUpComingMovie(): Observable<any> { 
    return this.http.get(this.upcomingMovieUrl);
  }
  getBlogHome(): Observable<any> {
    return this.http.get(this.blogHomeUrl);
  }

}


