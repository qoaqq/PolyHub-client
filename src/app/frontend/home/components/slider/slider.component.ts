import { AfterViewInit, Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  banner: any[] = [];

  constructor(private homeService: HomeService) { }

  ngAfterViewInit() {
    this.homeService.getBanner().subscribe(data => {
      this.banner = data.data.data;
      console.log(this.banner);
    });
  }
}
