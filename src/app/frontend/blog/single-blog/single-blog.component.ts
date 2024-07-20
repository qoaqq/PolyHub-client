import { Component, AfterViewInit, Renderer2, RendererFactory2, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import để sử dụng DomSanitizer

declare var tinymce: any; // Khai báo biến global tinymce

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  postId!: number;
  post: any;
  content: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPost();
      this.initTinyMCE();
    });
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

  
}
