<<<<<<< HEAD
import { TopMovieService } from './../../../../services/home/top-movie/top-movie.service';
import { Component, AfterViewInit } from '@angular/core';
=======
import { Component, AfterViewInit, Renderer2, RendererFactory2 } from '@angular/core';
import { TopMovieService } from './../../../../services/frontend/home/components/top-movie/top-movie.service';

declare var jQuery: any; // Declare jQuery
>>>>>>> 3f6c1d41250455d223014f5b8dcf8ab4c325018b

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.scss']
})
export class TopMovieComponent implements AfterViewInit {
  topMovies: any[] = [];

  constructor(
    private TopMovieService: TopMovieService
  ) {
  
  }
  async ngAfterViewInit() {
    try {
      const data = await this.TopMovieService.getTopMovies().toPromise();
      if (typeof jQuery == 'undefined') {
        console.log('jQuery chưa được tải');
      } else {
        this.topMovies = data.data;
      }
      // Thực hiện các thao tác khác nếu cần
      console.log(this.topMovies);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin top phim:', error);
    }
  }
}