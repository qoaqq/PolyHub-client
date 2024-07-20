import {
  Component,
<<<<<<< HEAD
=======
  AfterViewInit,
  Renderer2,
  RendererFactory2,
  AfterViewChecked,
>>>>>>> 3f6c1d41250455d223014f5b8dcf8ab4c325018b
} from '@angular/core';
import { HomeService } from './../../services/home.service';

declare var jQuery: any; // Declare jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
<<<<<<< HEAD
export class HomeComponent  {
  constructor() {
   
=======
export class HomeComponent implements AfterViewInit, AfterViewChecked {
  private renderer: Renderer2;
  movies: any[] = [];
  upcomingMovie: any[] = [];
  blogHome: any[] = [];
  private bxSliderInitialized = false;

  constructor(
    private rendererFactory: RendererFactory2,
    private homeService: HomeService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    this.loadResources();

    // Fetch movie data
    this.homeService.getMovies().subscribe((data) => {
      this.movies = data.data.data;
      this.initBxSliderIfReady(); // Initialize bxSlider when movie data is fetched
    });

    // Fetch upcoming movie data
    this.homeService.getUpComingMovie().subscribe((data) => {
      this.upcomingMovie = data.data.data;
      this.initBxSliderIfReady(); // Initialize bxSlider when upcoming movie data is fetched
    });

    // Fetch blog data
    this.homeService.getBlogHome().subscribe((data) => {
      this.blogHome = data.data;
    });
  }

  ngAfterViewChecked() {
    // Check if bxSlider hasn't been initialized and all necessary conditions are met
    this.initBxSliderIfReady();
  }

  private initBxSliderIfReady() {
    if (!this.bxSliderInitialized && this.isBxSliderReady()) {
      this.initBxSlider();
      this.bxSliderInitialized = true; // Mark as initialized to prevent re-initialization
    }
  }

  private isBxSliderReady(): boolean {
    return (
      typeof jQuery !== 'undefined' &&
      (jQuery('.bxslider').length > 0 &&
        typeof jQuery('.bxslider').bxSlider === 'function')
    );
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
      '../../../assets/js/jquery.bxslider.min.js', // Include bxslider in the scripts list
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

  private loadStylesheets(urls: string[]): Promise<void[]> {
    return Promise.all(urls.map((url) => this.loadStylesheet(url)));
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
>>>>>>> 3f6c1d41250455d223014f5b8dcf8ab4c325018b
  }

  private initBxSlider() {
    if ((jQuery as any)('.bxslider').length > 0) {
      (jQuery as any)('.bxslider').bxSlider({
        mode: 'horizontal',
        auto: true,
        controls: true,
        pager: false,
      });
    } else {
      console.error('Error: bxSlider elements not found.');
    }
  }
}