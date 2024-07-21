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
  
  constructor( private HomeService: HomeService) {
    
  }

}

