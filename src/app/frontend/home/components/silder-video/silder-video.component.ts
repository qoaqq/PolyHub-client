import { HomeService } from 'src/app/services/home/home.service';
import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-silder-video',
  templateUrl: './silder-video.component.html',
  styleUrls: ['./silder-video.component.scss']
})
export class SilderVideoComponent implements AfterViewInit {
  food: any[] = [];

  constructor(private HomeService: HomeService) {
  
  }

   ngAfterViewInit() {
    this.HomeService.getFood().subscribe(data => { 
      this.food = data.data;
      // console.log(this.food);
    });
  }
}
