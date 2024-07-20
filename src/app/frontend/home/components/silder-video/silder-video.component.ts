import { SilderVideoService } from './../../../../services/home/silder-video/silder-video.service';
import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-silder-video',
  templateUrl: './silder-video.component.html',
  styleUrls: ['./silder-video.component.scss']
})
export class SilderVideoComponent implements AfterViewInit {
  image: any[] = [];

  constructor(private SilderVideoService: SilderVideoService) {
  
  }

  async ngAfterViewInit() {
    try {
      const response = await this.SilderVideoService.getImage().toPromise();
      
      if (response && response.data?.data && Array.isArray(response.data?.data)) {
        this.image = response.data?.data;
      } else {
        console.error('Dữ liệu trả về không phải là mảng hoặc không có thuộc tính data:', response);
      }
      console.log(this.image);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin hình ảnh:', error);
    }
  }
}
