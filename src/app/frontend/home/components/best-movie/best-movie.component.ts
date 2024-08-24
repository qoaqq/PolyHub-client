import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-best-movie',
  templateUrl: './best-movie.component.html',
  styleUrls: ['./best-movie.component.scss']
})
export class BestMovieComponent implements AfterViewInit{
  best: any[] = [];
  constructor(private HomeService: HomeService ,private Router: Router) {
  }
  ngAfterViewInit(){
    // phim đang chiếu
    this.HomeService.getBestMovies().subscribe(data => {
      this.best = data.data;
    });
  }
}
