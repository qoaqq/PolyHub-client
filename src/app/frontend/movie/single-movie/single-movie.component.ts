import {
  Component,
  AfterViewInit,
  
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements AfterViewInit {
  movie: any;
  movieId: string | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngAfterViewInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(this.movieId).subscribe(movie => {
      this.movie = movie.data;
    })
    
  }

}
