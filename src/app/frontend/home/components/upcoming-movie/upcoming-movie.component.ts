import { HomeService } from 'src/app/services/home/home.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upcoming-movie',
  templateUrl: './upcoming-movie.component.html',
  styleUrls: ['./upcoming-movie.component.scss']
})
export class UpcomingMovieComponent {
  upcomingMovie: any[]=[];
  constructor( private HomeService: HomeService) {

  }
  ngAfterViewInit() {
    this.HomeService.getUpComingMovie().subscribe(data => { 
      this.upcomingMovie = data.data.data;
      // console.log(this.upcomingMovie);
    });
  }
}
