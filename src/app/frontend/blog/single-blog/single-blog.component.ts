import { Component, AfterViewInit, Renderer2, RendererFactory2, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import để sử dụng DomSanitizer

declare var tinymce: any; // Khai báo biến global tinymce

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit, AfterViewInit {
  postId!: number;
  post: any;
  content: SafeHtml = '';
  private renderer: Renderer2;

  constructor(
    private route: ActivatedRoute,
    private rendererFactory: RendererFactory2,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPost();
    });
  }

  ngAfterViewInit(): void {
    this.initTinyMCE();
    this.loadResources();
  }

  loadPost(): void {
    const baseUrl = 'http://127.0.0.1:8000/';
    this.blogService.getPostById(this.postId).subscribe({
      next: (post: any) => {
        this.post = {
          ...post.data,
          image: baseUrl + post.data.image
        };
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
      },
      error: (error: any) => {
        console.error('Error loading post:', error);
      }
    });
  }

  private initTinyMCE(): void {
    tinymce.init({
      selector: '#editor',
      plugins: 'autoresize',
      toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
      autoresize_bottom_margin: 16,
      setup: (editor: any) => {
        editor.on('init', () => {
          if (this.post) {
            editor.setContent(this.post.content);
          }
        });
      }
    });
  }

  private loadResources(): void {
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

    this.loadScriptsSequentially(scripts)
      .catch((error) => console.error('Error loading resources:', error));
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
