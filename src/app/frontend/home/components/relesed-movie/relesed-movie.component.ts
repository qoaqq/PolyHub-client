import { RelesedMovieService } from './../../../../services/home/relesed-movie/relesed-movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-relesed-movie',
  templateUrl: './relesed-movie.component.html',
  styleUrls: ['./relesed-movie.component.scss']
})
export class RelesedMovieComponent {
  movies: any[] = [];
  constructor(private RelesedMovieService: RelesedMovieService) {
  }
  ngAfterViewInit() {
    // phim đang chiếu
    this.RelesedMovieService.getMovies().subscribe(data => {
      this.movies = data.data.data;
      // console.log(data);
      // console.log(this.movies);
    });
  }
}
