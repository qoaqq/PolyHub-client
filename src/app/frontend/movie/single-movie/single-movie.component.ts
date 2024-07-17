import {
  Component,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
  
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements AfterViewInit {
  private renderer: Renderer2;
  movie: any;
  movieId: string | null = null;

  constructor(private route: ActivatedRoute, private rendererFactory: RendererFactory2, private movieService: MovieService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    this.loadResources();
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieById(this.movieId).subscribe(movie => {
      this.movie = movie.data;
    })
    
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
