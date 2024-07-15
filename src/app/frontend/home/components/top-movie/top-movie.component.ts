import { TopMovieService } from './../../../../services/home/top-movie/top-movie.service';
import { Component, AfterViewInit } from '@angular/core';

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
    //   console.log(this.topMovies);
    }
      // Thực hiện các thao tác khác nếu cần
      console.log(this.topMovies);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin top phim:', error);
    }
  }
}
