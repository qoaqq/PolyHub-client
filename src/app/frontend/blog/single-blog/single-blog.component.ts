import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  postId!: number;
  post: any;
  content: SafeHtml = '';
  latestBlogs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPost();
      this.loadLatestBlogs();
    });
  }

  loadPost(): void {
    const baseUrl = 'http://127.0.0.1:8000/';
    this.blogService.getBlogById(this.postId).subscribe({
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

  loadLatestBlogs(): void {
    const baseUrl = 'http://127.0.0.1:8000/';
    this.blogService.getLatestBlogs().subscribe({
      next: (response: any) => {
        console.log('Received latest blogs:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.latestBlogs = response.data.map((blog: any) => ({
            ...blog,
            image: baseUrl + blog.image // Xử lý ảnh của bài viết
          }));
        } else {
          console.error('Invalid latest blogs format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading latest blogs:', error);
      }
    });
  }
}
