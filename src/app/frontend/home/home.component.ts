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
  sliderIMG: any;
  constructor( private HomeService: HomeService , private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.HomeService.getBlogHot().subscribe(data => {
      this.blogHot = data.data;
    });
<<<<<<< HEAD
      this.movieId = this.route.snapshot.paramMap.get('id');
      this.HomeService.getSilder(this.movieId).subscribe(movie => {
        this.movie = movie.data;
        this.getImage();
      });
    
    sessionStorage.removeItem('billData');
    sessionStorage.removeItem('showingRelease');
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedFoodCombos');
    sessionStorage.removeItem('paymentForm');
    sessionStorage.removeItem('grandTotal');
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('totalPriceTicketSeat');
=======
>>>>>>> 02b47670981f3b1152c87ef64437126b85f2f1b0
  }
  goToMovies() {
    this.router.navigate(['/movies']);
  }
}
