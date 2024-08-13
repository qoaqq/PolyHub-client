import { HomeService } from 'src/app/services/home/home.service';
import {  AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-movie',
  templateUrl: './upcoming-movie.component.html',
  styleUrls: ['./upcoming-movie.component.scss']
})
export class UpcomingMovieComponent implements AfterViewInit{
  upcomingMovie: any[]=[];
  constructor( private HomeService: HomeService, private Router: Router) {

  }
  ngAfterViewInit(){
    this.HomeService.getUpComingMovie().subscribe(data => { 
      this.upcomingMovie = data.data.data;
      // console.log(this.upcomingMovie);
    });
  }
  viewDetails(movieId: number): void {
    this.Router.navigate(['/movie', movieId]).then(() => {
      window.location.reload();
    });
  }
}
