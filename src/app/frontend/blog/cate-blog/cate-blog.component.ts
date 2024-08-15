import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-cate-blog',
  templateUrl: './cate-blog.component.html',
  styleUrls: ['./cate-blog.component.scss'],
})
export class CateBlogComponent implements OnInit {
  blogs: any[] = [];
  blogLastest: any[] = [];
  countAllBlogs: number = 0;
  searchForm: FormGroup;
  categories: any[] = [];
  latestBlogs: any[] = [];
  selectedCategory: number | null = null;
  currentPage: number = 1;
  totalPages: number = 0;
  searchTerm: string = '';

  constructor(private blogService: BlogService,private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      title: ['']
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories.data;
      this.countAllBlogs = categories.allBlogs;
    })
    
    this.blogService.getLatestBlogs().subscribe(blogLastest => {
        this.blogLastest = blogLastest.data;
        console.log(this.blogLastest);
        
    })
  }

  loadBlogs(page: number = this.currentPage) {
    if (this.searchTerm) {
      // Tìm kiếm theo tiêu đề
      this.blogService.searchBlogs(this.searchTerm, page).subscribe(response => {
        this.blogs = response.data.data;
        this.totalPages = response.data.last_page; // Assuming API response includes total_pages
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    } else if (this.selectedCategory !== null) {
      // Lấy phim theo danh mục
      this.blogService.getBlogsByCategory(this.selectedCategory, page).subscribe(response => {
        this.blogs = response.data.data;
        this.totalPages = response.data.last_page;
         // Assuming API response includes total_pages
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    } else {
      // Lấy danh sách phim
      this.blogService.getList(page).subscribe(response => {
        this.blogs = response.data.data;
        this.totalPages = response.data.last_page; // Assuming API response includes last_page
        this.currentPage = response.data.current_page; // Assuming API response includes current_page
      });
    }
  }



  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedCategory = null;
    this.searchTerm = inputElement.value;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadBlogs();
  }

  getAllBlogs(event: Event){
    event.preventDefault();
    this.selectedCategory = null;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadBlogs();
  }


  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBlogs(page);
    }
  }

  getPages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  previousPage() {
    console.log(1);
    
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.onPageChange(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.onPageChange(this.currentPage);
    }
  }

  getBlogsByCategoryID(id: number, event: Event): void{
    event.preventDefault();
    this.selectedCategory = id;
    this.currentPage = 1; // Reset page to 1 for new search
    this.loadBlogs();
    
  }
  
}
