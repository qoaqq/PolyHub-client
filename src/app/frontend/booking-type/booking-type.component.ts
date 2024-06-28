import {
  Component,
  AfterViewInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import "isotope-layout";
import "imagesloaded";
import * as $ from "jquery";

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss'],
})
export class BookingTypeComponent implements AfterViewInit {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    this.loadResources();
    this.initJQueryFunctions();
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

  private initJQueryFunctions() {
    const protfolioIsotope = () => {
      if ($('.st_fb_filter_left_box_wrapper').length) {
        $('.protfoli_inner, .portfoli_inner').imagesLoaded(function () {
          $('.protfoli_inner, .portfoli_inner').isotope({
            layoutMode: 'masonry',
          });
        });

        $('.protfoli_filter li').on('click', function () {
          $('.protfoli_filter li').removeClass('active');
          $(this).addClass('active');
          const selector = $(this).attr('data-filter');
          $('.protfoli_inner, .portfoli_inner').isotope({
            filter: selector,
          });
          return false;
        });
      }
    };

    const changeQty = (increase: boolean) => {
      let qty = parseInt($('.select_number').find('input').val() as string);
      if (!isNaN(qty)) {
        qty = increase ? qty + 1 : qty > 1 ? qty - 1 : 1;
        $('.select_number').find('input').val(qty);
      } else {
        $('.select_number').find('input').val(1);
      }
    };

    protfolioIsotope();
  }
}
