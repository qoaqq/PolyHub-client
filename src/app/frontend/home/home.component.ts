import { Router, ActivatedRoute } from '@angular/router'; 
import { HomeService } from './../../services/home/home.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit { 
  blogHot: any[] = [];
  movieId: string | null = null;
  movie: any;
  
  constructor(private homeService: HomeService, private router: Router, private route: ActivatedRoute) {} 

  goToMovies() {
    this.router.navigate(['/movies']);
  }

  ngAfterViewInit(){
    this.homeService.getBlogHot().subscribe(data => {
      this.blogHot = data.data;
      // console.log(data);
      // console.log(this.blogHot);
    });
    
      this.movieId = this.route.snapshot.paramMap.get('id');
      this.homeService.getSilder(this.movieId).subscribe(movie => {
        this.movie = movie.data;
      })
  }
}
