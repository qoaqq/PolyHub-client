import { HomeService } from 'src/app/services/home/home.service';
import { Component, AfterViewInit } from '@angular/core';


declare var jQuery: any; // Declare jQuery

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.scss']
})
export class TopMovieComponent implements AfterViewInit {
  topMovies: any[] = [];

  constructor(
    private HomeService: HomeService
  ) {
  
  }
  async ngAfterViewInit() {
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
}