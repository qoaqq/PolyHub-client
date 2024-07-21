import { HomeService } from 'src/app/services/home/home.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-relesed-movie',
  templateUrl: './relesed-movie.component.html',
  styleUrls: ['./relesed-movie.component.scss']
})
export class RelesedMovieComponent {
  movies: any[] = [];
  constructor(private HomeService: HomeService) {
  }
  ngAfterViewInit() {
    // phim đang chiếu
    this.HomeService.getMovies().subscribe(data => {
      this.movies = data.data.data;
      // console.log(data);
      // console.log(this.movies);
    });
  }
}
