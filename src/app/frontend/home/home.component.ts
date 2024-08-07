import { Router } from '@angular/router';
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
  
  constructor( private HomeService: HomeService , private router: Router) {
    
  }

  ngOnInit(): void {
    sessionStorage.removeItem('billData');
    sessionStorage.removeItem('showingRelease');
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedFoodCombos');
  }

  goToMovies() {
    this.router.navigate(['/movies']);
  }

}

