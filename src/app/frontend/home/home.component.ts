import { Router } from '@angular/router';
import { HomeService } from './../../services/home/home.service';
import {
  Component
} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  blogHot: any[] = [];
  constructor( private HomeService: HomeService , private router: Router) {
    
  }
  goToMovies() {
    this.router.navigate(['/movies']);
  }
  ngAfterViewInit() {
    this.HomeService.getBlogHot().subscribe(data => {
      this.blogHot = data.data;
      // console.log(data);
      console.log(this.blogHot);
    });
  }

}

