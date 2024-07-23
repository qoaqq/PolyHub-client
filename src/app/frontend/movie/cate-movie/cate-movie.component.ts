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
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';
  selectedCategory: number | null = null;

  
  constructor(private route: ActivatedRoute,private movieService: MovieService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      title: ['']
    });
  }

  ngAfterViewInit() {
    this.loadMovies();
    this.movieService.getCategories().subscribe(categories => {
      this.categories = categories.data;
      this.countAllMovies = categories.allMovies;
    })
    this.movieService.getTopMoviesInMonth().subscribe(movies => {
      this.topMovies = movies.data;
    })
  }

  loadMovies(page: number = this.currentPage) {
    if (this.searchTerm) {
      // Tìm kiếm theo tiêu đề
      this.movieService.searchMovies(this.searchTerm).subscribe(response => {
        this.movies = response.data.data;
        this.totalPages = response.data.last_page; // Assuming API response includes total_pages
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    } else if (this.selectedCategory !== null) {
      // Lấy phim theo danh mục
      this.movieService.getMoviesByCategory(this.selectedCategory).subscribe(response => {
        this.movies = response.data;
        this.totalPages = response.data.last_page; // Assuming API response includes total_pages
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    } else {
      // Lấy danh sách phim
      this.movieService.getList(page).subscribe(response => {
        this.movies = response.data.data;
        this.totalPages = response.data.last_page; // Assuming API response includes last_page
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    }
  }

  // for search input 
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadMovies();
  }


  // get movies by category
  getMoviesByCategoryID(id: number, event: Event): void{
    event.preventDefault();
    this.movieService.getMoviesByCategory(id).subscribe(
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
    this.movieService.getList().subscribe(movie => {
      this.movies = movie.data.data;
      console.log(this.movies);
    })
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
  }

  // pagination
  onPageChange(page: number) {
    if (page > 0) {
      console.log(page);
      this.currentPage = page;
      this.loadMovies(page);
    }
  }

}
