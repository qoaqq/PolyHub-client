import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8000/api/home-movie';
  private topMoviesUrl = 'http://localhost:8000/api/top-movie-in-month';
  private foodUrl = 'http://localhost:8000/api/foodcombo';
  private upcomingMovieUrl = 'http://localhost:8000/api/upcoming-movie';
  private blogHomeUrl = 'http://localhost:8000/api/blog-home';
  private bestMovieUrl = 'http://localhost:8000/api/top-movie';
  private bannerUrl = 'http://localhost:8000/api/banners';
  private bloghotUrl = 'http://localhost:8000/api/blog-hot';
  private sliderUrl = 'http://localhost:8000/api/silder-movie';
  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<any> { 
    return this.http.get(this.topMoviesUrl);
  }
  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  getFood(): Observable<any> { 
    return this.http.get(this.foodUrl);
  }
  getUpComingMovie(): Observable<any> { 
    return this.http.get(this.upcomingMovieUrl);
  }
  getBlogHome(): Observable<any> {
    return this.http.get(this.blogHomeUrl);
  }
  getBestMovies(): Observable<any> { 
    return this.http.get(this.bestMovieUrl);
  }
  getBanner(): Observable<any> { 
    return this.http.get(this.bannerUrl);
  }

  getBlogHot(): Observable<any> { 
    return this.http.get(this.bloghotUrl);
  }
  getSilder(id: any): Observable<any> {
    return this.http.get(this.sliderUrl);
  }
}


