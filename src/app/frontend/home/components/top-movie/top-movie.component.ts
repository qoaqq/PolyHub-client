import { TopMovieService } from './../../../../services/frontend/home/components/top-movie/top-movie.service';
import { Component, Renderer2, RendererFactory2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-top-movie',
  templateUrl: './top-movie.component.html',
  styleUrls: ['./top-movie.component.scss']
})
export class TopMovieComponent implements AfterViewInit {
  private renderer: Renderer2;
  topMovies: any[] = [];

  constructor(
    private rendererFactory: RendererFactory2,
    private topMovieService: TopMovieService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  async ngAfterViewInit() {
    try {
      const data = await this.topMovieService.getTopMovies().toPromise();
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
