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
  baseUrl = 'http://127.0.0.1:8000/'; 

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
        if (response && response.status) {
          const blog = response.data.blog;
          this.blog = {
            ...blog,
            image: this.baseUrl + blog.image
          };
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
  
          if (Array.isArray(response.data.relatedBlogs)) {
            this.latestBlogs = response.data.relatedBlogs.map((blog: any) => ({
              ...blog,
              image: this.baseUrl + blog.image
            }));
          } else {
            this.latestBlogs = []; 
          }
        } else {
          // Handle error or show user-friendly message
        }
      },
      error: (error: any) => {
        // Handle error or show user-friendly message
      }
    });
  }
}
