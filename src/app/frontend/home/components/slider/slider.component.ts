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
      // console.log(this.banner);
    });
  }
  getDataActions(movie: any): string {
    const dataActions = [
      { event: 'click', action: 'stoplayer', layer: 'slide-' + movie.i + '-layer-3', delay: '' },
      { event: 'click', action: 'stoplayer', layer: 'slide-' + movie.i + '-layer-5', delay: '' },
      { event: 'click', action: 'startlayer', layer: 'slide-' + movie.i + '-layer-1', delay: '' }
    ];
    return JSON.stringify(dataActions);
  }
}
