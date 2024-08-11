import { Router, ActivatedRoute } from '@angular/router'; 
import { HomeService } from './../../services/home/home.service';
import {
  Component,
  OnInit
} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit  {
  blogHot: any[] = [];
  movieId: string | null = null;
  movie: any;
  constructor( private HomeService: HomeService , private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.HomeService.getBlogHot().subscribe(data => {
      this.blogHot = data.data;
      // console.log(data);
      // console.log(this.blogHot);
    });
      this.movieId = this.route.snapshot.paramMap.get('id');
      this.HomeService.getSilder(this.movieId).subscribe(movie => {
        this.movie = movie.data;
        console.log(this.movie.attributes);
        this.getImage();
      });
    
    sessionStorage.removeItem('billData');
    sessionStorage.removeItem('showingRelease');
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedFoodCombos');
  }

  goToMovies() {
    this.router.navigate(['/movies']);
  }
  getImage(){
   this.movie.attributes.foreach((item:any) => {
     console.log(item); 
     
    }); 
  }
}
