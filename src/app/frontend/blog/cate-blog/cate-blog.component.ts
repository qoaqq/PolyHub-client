import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-cate-blog',
  templateUrl: './cate-blog.component.html',
  styleUrls: ['./cate-blog.component.scss'],
})
export class CateBlogComponent implements OnInit, AfterViewInit {
  posts: any[] = [];
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private blogService: BlogService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.loadResources();
  }

  loadPosts(): void {
    const baseUrl = 'http://127.0.0.1:8000/'; // Thay thế bằng URL cơ sở thực tế của API

    this.blogService.getPosts().subscribe({
      next: (response: any) => {
        console.log('Raw data:', response);
        // Kiểm tra nếu dữ liệu trả về có thuộc tính 'data' chứa mảng
        if (response && Array.isArray(response.data)) {
          this.posts = response.data.map((post: any) => ({
            ...post,
            image: baseUrl + post.image // Cập nhật đường dẫn hình ảnh
          }));
        } else {
          console.error('Invalid data format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading posts: ', error);
      }
    });
  }


  private loadResources() {
    const stylesheets = [
      '../../../assets/css/animate.css',
      '../../../assets/css/bootstrap.css',
      '../../../assets/css/font-awesome.css',
      '../../../assets/css/fonts.css',
      '../../../assets/css/flaticon.css',
      '../../../assets/css/owl.carousel.css',
      '../../../assets/css/owl.theme.default.css',
      '../../../assets/css/dl-menu.css',
      '../../../assets/css/nice-select.css',
      '../../../assets/css/magnific-popup.css',
      '../../../assets/css/venobox.css',
      '../../../assets/js/plugin/rs_slider/layers.css',
      '../../../assets/js/plugin/rs_slider/navigation.css',
      '../../../assets/js/plugin/rs_slider/settings.css',
      '../../../assets/css/style.css',
      '../../../assets/css/responsive.css',
    ];

    const scripts = [
      '../../../assets/js/jquery_min.js',
      '../../../assets/js/modernizr.js',
      '../../../assets/js/bootstrap.js',
      '../../../assets/js/owl.carousel.js',
      '../../../assets/js/jquery.dlmenu.js',
      '../../../assets/js/jquery.sticky.js',
      '../../../assets/js/jquery.nice-select.min.js',
      '../../../assets/js/jquery.magnific-popup.js',
      '../../../assets/js/jquery.bxslider.min.js',
      '../../../assets/js/venobox.min.js',
      '../../../assets/js/smothscroll_part1.js',
      '../../../assets/js/smothscroll_part2.js',
      '../../../assets/js/plugin/rs_slider/jquery.themepunch.revolution.min.js',
      '../../../assets/js/plugin/rs_slider/jquery.themepunch.tools.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.addon.snow.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.actions.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.carousel.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.kenburn.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.layeranimation.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.migration.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.navigation.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.parallax.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.slideanims.min.js',
      '../../../assets/js/plugin/rs_slider/revolution.extension.video.min.js',
      '../../../assets/js/custom.js',
    ];

    this.loadStylesheets(stylesheets)
      .then(() => this.loadScriptsSequentially(scripts))
      .catch((error) => console.error('Error loading resources:', error));
  }

  private loadStylesheets(urls: string[]): Promise<void> {
    return Promise.all(urls.map((url) => this.loadStylesheet(url))).then(() => {});
  }

  private loadStylesheet(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'type', 'text/css');
      this.renderer.setAttribute(link, 'href', url);
      link.onload = () => resolve();
      link.onerror = (error: ErrorEvent) => reject(error);
      this.renderer.appendChild(document.head, link);
    });
  }

  private loadScriptsSequentially(urls: string[]): Promise<void> {
    return urls.reduce((promise, url) => {
      return promise.then(() => this.loadScript(url));
    }, Promise.resolve());
  }

  private loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'type', 'text/javascript');
      this.renderer.setAttribute(script, 'src', url);
      script.onload = () => resolve();
      script.onerror = (error: ErrorEvent) => reject(error);
      this.renderer.appendChild(document.head, script);
    });
  }
}