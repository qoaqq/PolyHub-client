import { HomeService } from 'src/app/services/home/home.service';
import { AfterViewInit, Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relesed-movie',
  templateUrl: './relesed-movie.component.html',
  styleUrls: ['./relesed-movie.component.scss']
})
export class RelesedMovieComponent implements AfterViewInit{
  movies: any[] = [];
  constructor(private HomeService: HomeService ,private Router: Router) {
  }
  ngAfterViewInit(){
    // phim đang chiếu
    this.HomeService.getMovies().subscribe(data => {
      this.movies = data.data.data;
      // console.log(data);
      // console.log(this.movies);
    });
  }
  viewDetails(movieId: number): void {
    this.Router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
  }
  
}

