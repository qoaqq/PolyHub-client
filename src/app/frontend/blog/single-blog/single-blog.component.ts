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
  blogId!: number;
  blog: any;
  content: SafeHtml = '';
  latestBlogs: any[] = [];
  baseUrl = 'http://127.0.0.1:8000/'; // Đảm bảo URL đúng

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];
      this.loadBlog();
    });
  }

  loadBlog(): void {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (response: any) => {
        console.log('API Response:', response); // Debugging
  
        if (response && response.status) {
          const blog = response.data.blog;
          this.blog = {
            ...blog,
            image: this.baseUrl + blog.image
          };
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
  
          // Kiểm tra xem relatedBlogs có tồn tại và là mảng không
          if (Array.isArray(response.data.relatedBlogs)) {
            this.latestBlogs = response.data.relatedBlogs.map((blog: any) => ({
              ...blog,
              image: this.baseUrl + blog.image
            }));
          } else {
            console.warn('relatedBlogs is not an array or is undefined');
            this.latestBlogs = []; // Xử lý khi relatedBlogs không phải là mảng
          }
        } else {
          console.error('Error:', response.message);
        }
      },
      error: (error: any) => {
        console.error('Error loading blog:', error);
      }
    });
  }
  
}
