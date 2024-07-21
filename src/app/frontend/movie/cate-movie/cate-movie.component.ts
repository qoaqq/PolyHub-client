import {
  Component,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';


@Component({
  selector: 'app-cate-movie',
  templateUrl: './cate-movie.component.html',
  styleUrls: ['./cate-movie.component.scss']
})
export class CateMovieComponent implements AfterViewInit {
  movies: any[] = [];
  countAllMovies: number = 0;
  searchForm: FormGroup;
  categories: any[] = [];
  topMovies: any[] = [];
  pageChange: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number = 1;

  
  constructor(private route: ActivatedRoute,private movie: MovieService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      title: ['']
    });
  }

  ngAfterViewInit() {
    this.movie.getList().subscribe(movie => {
      this.movies = movie.data.data;
      console.log(this.movies);
    })

    this.movie.getCategories().subscribe(categories => {
      this.categories = categories.data;
      this.countAllMovies = categories.allMovies;
      console.log(this.categories); 
    })

    this.movie.getTopMoviesInMonth().subscribe(movies => {
      this.topMovies = movies.data;
      console.log(this.topMovies); 
    })
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const title = inputElement.value;
    
    if (title) {
      this.movie.searchMovies(title).subscribe(
        movies => {
          this.movies = movies.data.data;
          console.log(this.movies);
          
        },
        error => {
          console.error('having no record', error);
        }
      );
    }
  }


  getMoviesByCategoryID(id: number, event: Event): void{
    event.preventDefault();
    this.movie.getMoviesByCategory(id).subscribe(
      movies => {
        this.movies = movies.data.data;
        console.log(this.movies);
      },
      error => {
        console.error('having no record', error);
      }
    );
  }

  getAllMovies(event: Event){
    event.preventDefault();
    this.movie.getList().subscribe(movie => {
      this.movies = movie.data.data;
      console.log(this.movies);
    })
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

}
