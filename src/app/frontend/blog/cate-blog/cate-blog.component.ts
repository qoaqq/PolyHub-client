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
  latestBlogs: any[] = [];
  selectedCategoryId: number | null = null;
  selectedYear: number | null = null;
  years: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalBlogs: number = 0;
  searchTerm: string = '';
  baseUrl = 'http://127.0.0.1:8000/';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBlogs();
    this.loadLatestBlogs();
    this.loadYears();
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

  loadBlogs(page: number = 1): void {
    const perPage = 5; // Hoặc số lượng bài viết mỗi trang bạn muốn
  
    this.blogService.getAllBlogs(page, perPage).subscribe({
      next: (response: any) => {
        console.log('Received blogs:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.blogs = response.data.map((blog: any) => ({
            ...blog,
            image: this.baseUrl + blog.image // Xử lý ảnh của bài viết
          }));
          this.currentPage = response.current_page; // Trang hiện tại
          this.totalPages = response.total_pages; // Tổng số trang
          this.totalBlogs = response.total; // Tổng số bài viết
        } else {
          console.error('Invalid blogs format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading blogs:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBlogs(this.currentPage);
    }
  }

  getPagesArray(): number[] {
    // Tạo mảng các số trang từ 1 đến totalPages
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  loadLatestBlogs(): void {
    this.blogService.getLatestBlogs().subscribe({
      next: (response: any) => {
        console.log('Received latest blogs:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.latestBlogs = response.data.map((blog: any) => ({
            ...blog,
            image: this.baseUrl + blog.image // Xử lý ảnh của bài viết
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

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.currentPage = 1; // Reset trang hiện tại khi thay đổi danh mục
    const perPage = 5; // Số lượng bài viết mỗi trang
  
    if (categoryId !== null) {
      this.blogService.getBlogsByCategory(categoryId, this.currentPage, perPage).subscribe({
        next: (response: any) => {
          console.log('Received blogs by category:', response);
          if (response && response.data) {
            this.blogs = response.data.map((blog: any) => ({
              id: blog.id,
              title: blog.title,
              short_desc: blog.short_desc,
              content: blog.content,
              image: this.baseUrl + blog.image,
              categories_id: blog.categories_id,
              created_at: blog.created_at,
              updated_at: blog.updated_at
            }));
            this.currentPage = response.current_page; // Cập nhật trang hiện tại
            this.totalPages = response.total_pages; // Cập nhật tổng số trang
            this.totalBlogs = response.total; // Cập nhật tổng số bài viết
          } else {
            console.error('Invalid blogs format:', response);
          }
        },
        error: (error: any) => {
          console.error('Error loading blogs by category:', error);
        }
      });
    } else {
      this.loadBlogs(); // Nếu không có danh mục, tải tất cả bài viết
    }
  }
  

  loadYears(): void {
    this.blogService.getYearsAndCounts().subscribe({
      next: (response: any) => {
        console.log('Received years and counts:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.years = response.data;
        } else {
          console.error('Invalid years format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error loading years:', error);
      }
    });
  }

  onYearSelected(year: number | null, page: number = 1): void {
    this.selectedYear = year;
    const perPage = 5; // Số lượng bài viết mỗi trang
  
    if (year !== null) {
      this.blogService.getBlogsByYear(year, page, perPage).subscribe({
        next: (response: any) => {
          console.log('Received blogs by year:', response);
          if (response && response.data) {
            this.blogs = response.data.blogs.map((blog: any) => ({
              ...blog,
              image: this.baseUrl + blog.image // Xử lý ảnh của bài viết
            }));
            this.currentPage = response.data.current_page; // Cập nhật trang hiện tại
            this.totalPages = response.data.total_pages; // Cập nhật tổng số trang
            this.totalBlogs = response.data.total; // Cập nhật tổng số bài viết
          } else {
            console.error('Invalid blogs format:', response);
          }
        },
        error: (error: any) => {
          console.error('Error loading blogs by year:', error);
        }
      });
    } else {
      this.loadBlogs(); // Nếu không chọn năm, tải tất cả bài viết
    }
  }

  searchBlogs(search: string, page: number = 1): void {
    const perPage = 5; // Số lượng bài viết mỗi trang
  
    this.blogService.searchBlogs(search, page, perPage).subscribe({
      next: (response: any) => {
        console.log('Received search results:', response);
        if (response && response.data) {
          this.blogs = response.data.blogs.map((blog: any) => ({
            ...blog,
            image: this.baseUrl + blog.image // Xử lý ảnh của bài viết
          }));
          this.currentPage = response.data.current_page; // Cập nhật trang hiện tại
          this.totalPages = response.data.total_pages; // Cập nhật tổng số trang
          this.totalBlogs = response.data.total; // Cập nhật tổng số bài viết
        } else {
          console.error('Invalid search results format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error searching blogs:', error);
      }
    });
  }

  
}
