import { BlogMovieService } from './../../../../services/home/blog-movie/blog-movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-movie',
  templateUrl: './blog-movie.component.html',
  styleUrls: ['./blog-movie.component.scss']
})
export class BlogMovieComponent {
  blogHome: any[] = [];
  constructor(private BlogMovieService: BlogMovieService) {
   
  }
  ngAfterViewInit() {
    this.BlogMovieService.getBlogHome().subscribe(data => {
      this.blogHome = data.data;
      // console.log(data);
      // console.log(this.movies);
    });
  }
}
