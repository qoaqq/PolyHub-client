import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { AfterViewInit, Component } from '@angular/core';


declare var jQuery: any; // Declare jQuery

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.scss']
})
export class TopMovieComponent implements AfterViewInit {
  topMovies: any[] = [];

  constructor(
    private HomeService: HomeService, private Router: Router
  ) {
  
  }
  async ngAfterViewInit(){
    try {
      const data = await this.HomeService.getTopMovies().toPromise();
      if (typeof jQuery == 'undefined') {
        console.log('jQuery chưa được tải');
      } else {
        this.topMovies = data.data;
      }
      // Thực hiện các thao tác khác nếu cần
      // console.log(this.topMovies);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin top phim:', error);
    }
  }
  viewDetails(movieId: number): void {
    this.Router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
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