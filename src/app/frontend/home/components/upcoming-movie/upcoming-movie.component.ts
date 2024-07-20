import { UpcomingMovieService } from './../../../../services/home/upcoming-movie/upcoming-movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upcoming-movie',
  templateUrl: './upcoming-movie.component.html',
  styleUrls: ['./upcoming-movie.component.scss']
})
export class UpcomingMovieComponent {
  upcomingMovie: any[]=[];
  constructor( private UpcomingMovieService: UpcomingMovieService) {

  }
  ngAfterViewInit() {
    this.UpcomingMovieService.getUpComingMovie().subscribe(data => { 
      this.upcomingMovie = data.data.data;
      // console.log(this.upcomingMovie);
    });
  }
}
