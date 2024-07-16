import { AfterViewInit, Component, Renderer2, RendererFactory2 } from '@angular/core';
import { SilderVideoService } from 'src/app/services/frontend/home/components/silder-video/silder-video.service';

@Component({
  selector: 'app-silder-video',
  templateUrl: './silder-video.component.html',
  styleUrls: ['./silder-video.component.scss']
})
export class SilderVideoComponent implements AfterViewInit {
  private renderer: Renderer2;
  image: any[] = [];

  constructor(
    private rendererFactory: RendererFactory2,
    private SilderVideoService: SilderVideoService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
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
