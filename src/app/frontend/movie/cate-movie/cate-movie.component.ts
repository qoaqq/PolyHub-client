import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-cate-movie',
  templateUrl: './cate-movie.component.html',
  styleUrls: ['./cate-movie.component.scss']
})
export class CateMovieComponent implements OnInit {
  movies: any[] = [];
  countAllMovies: number = 0;
  searchForm: FormGroup;
  categories: any[] = [];
  topMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';
  selectedCategory: number | null = null;
  bannerImages: any;

  
  constructor(private route: ActivatedRoute,private movieService: MovieService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      title: ['']
    });
  }

  ngOnInit() {
    this.loadMovies();
    this.movieService.getCategories().subscribe(categories => {
      this.categories = categories.data;
      this.countAllMovies = categories.allMovies;
    })
    this.movieService.getTopMoviesInMonth().subscribe(movies => {
      this.topMovies = movies.data;
    })
    this.movieService.getHotBanner().subscribe(banners => {
      this.bannerImages = banners.data;
      console.log(this.bannerImages);
    })
  }

  loadMovies(page: number = this.currentPage) {
    if (this.searchTerm) {
      // Tìm kiếm theo tiêu đề
      this.movieService.searchMovies(this.searchTerm, page).subscribe(response => {
        this.movies = response.data.data;
        this.totalPages = response.data.last_page; // Assuming API response includes total_pages
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    } else if (this.selectedCategory !== null) {
      // Lấy phim theo danh mục
      this.movieService.getMoviesByCategory(this.selectedCategory, page).subscribe(response => {
        this.movies = response.data.data;
        this.totalPages = response.data.last_page;
         // Assuming API response includes total_pages
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
    this.selectedCategory = null;
    this.searchTerm = inputElement.value;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadMovies();
  }


  // get movies by category
  getMoviesByCategoryID(id: number, event: Event): void{
    event.preventDefault();
    this.selectedCategory = id;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadMovies();
    
  }

  getAllMovies(event: Event){
    event.preventDefault();
    this.selectedCategory = null;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadMovies();
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
  }

  // pagination
  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies(page);
    }
  }

  // lấy ra danh sách số page hiển thị
  getPages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  previousPage() {
    console.log(1);
    
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.onPageChange(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.onPageChange(this.currentPage);
    }
  }

  prev(): void {
    const sliderContainer = document.getElementById('slider-container');
    if (sliderContainer) {
      sliderContainer.scrollLeft -= 270;
    }
  }

  next(): void {
    const sliderContainer = document.getElementById('slider-container');
    if (sliderContainer) {
      sliderContainer.scrollLeft += 270;
    }
  }

}
