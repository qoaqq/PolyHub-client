import { HomeService } from 'src/app/services/home/home.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-movie',
  templateUrl: './blog-movie.component.html',
  styleUrls: ['./blog-movie.component.scss']
})
export class BlogMovieComponent {
  blogHome: any[] = [];
  constructor(private HomeService: HomeService) {
   
  }
  ngAfterViewInit() {
    this.HomeService.getBlogHome().subscribe(data => {
      this.blogHome = data.data;
      // console.log(data);
      // console.log(this.movies);
    });
  }
}
