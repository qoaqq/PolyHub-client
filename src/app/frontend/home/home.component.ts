import { HomeService } from './../../services/home.service';
import {
  Component,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  private renderer: Renderer2;
  movies: any[] = [];
  topMovies: any[] = [];
  image: any[]=[];
  upcomingMovie: any[]=[];
  blogHome: any[] = [];
  constructor(private rendererFactory: RendererFactory2, private HomeService: HomeService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }



  ngAfterViewInit() {

    this.loadResources();
    // lấy thông tin top phim
    this.HomeService.getTopMovies().subscribe(data => { 
      if (typeof jQuery == 'undefined') {
        console.log('jQuery chưa được tải');
    } else {
      this.topMovies = data.data;
    //   console.log(this.topMovies);
    }
    });
    
    // phim đang chiếu
    this.HomeService.getMovies().subscribe(data => {
      this.movies = data.data.data;
      // console.log(data);
      // console.log(this.movies);
    });

    // ảnh 

    this.HomeService.getImage().subscribe(data => { 
      
      if (typeof jQuery == 'undefined') {
        console.log('jQuery chưa được tải');
    } else {
      this.image = data.data.data;
      console.log(this.image);
    }
    });
    
    //  Phim sắp chiếu
    this.HomeService.getUpComingMovie().subscribe(data => { 
      this.upcomingMovie = data.data.data;
      // console.log(this.upcomingMovie);
    });

    this.HomeService.getBlogHome().subscribe(data => {
      this.blogHome = data.data;
      // console.log(data);
      // console.log(this.movies);
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
    return Promise.all(urls.map((url) => this.loadStylesheet(url))).then(
      () => {}
    );
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

