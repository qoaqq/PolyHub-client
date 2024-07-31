import {
  Component,
  OnInit,
  
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {
  movie: any;
  movieId: string | null = null;
  topMovies: any[] = [];
  topStories: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(this.movieId).subscribe(movie => {
      this.movie = movie.data;
    })

    this.movieService.getTopMoviesInMonth().subscribe(movies => {
      this.topMovies = movies.data;
    })
    this.movieService.getTopStories().subscribe(stories => {
      this.topStories = stories.data.data;
      console.log(this.topStories);
    })
  }

  bookingNow(): void {
    this.router.navigate(['/movie-booking']).then(() => {
      sessionStorage.setItem('movie', JSON.stringify(this.movie));
      window.location.reload();
    });
  }

  onClickDefault(event: Event): void {
    event.preventDefault();
    console.log('Default action prevented');
  }
}
