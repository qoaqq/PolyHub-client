import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-cate-blog',
  templateUrl: './cate-blog.component.html',
  styleUrls: ['./cate-blog.component.scss'],
})
export class CateBlogComponent implements OnInit {
  blogs: any[] = [];
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  baseUrl = 'http://127.0.0.1:8000/';
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBlogs();
  }

  loadCategories(): void {
    this.blogService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('Received categories:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.error('Invalid categories format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (response: any) => {
        console.log('Received blogs:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.blogs = response.data.map((blog: any) => ({
            ...blog,
            image: this.baseUrl + blog.image // Xử lý ảnh của bài viết
          }));
        } else {
          console.error('Invalid blogs format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading blogs:', error);
      }
    });
  }

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    if (categoryId !== null) {
      this.blogService.getBlogsByCategory(categoryId).subscribe({
        next: (response: any) => {
          console.log('Received blogs by category:', response);
          if (response && response.data) {
            // Convert object to array of blogs
            this.blogs = Object.keys(response.data).map(key => ({
              id: response.data[key].id,
              title: response.data[key].title,
              short_desc: response.data[key].short_desc,
              content: response.data[key].content,
              image: this.baseUrl + response.data[key].image,
              categories_id: response.data[key].categories_id,
              created_at: response.data[key].created_at,
              updated_at: response.data[key].updated_at
            }));
          } else {
            console.error('Invalid blogs format:', response);
          }
        },
        error: (error: any) => {
          console.error('Error loading blogs by category:', error);
        }
      });
    } else {
      // Load all blogs
      this.loadBlogs();
    }
  }
  
}
