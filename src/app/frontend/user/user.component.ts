import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any = {}; // Biến lưu trữ thông tin người dùng
  errorMessage: string = '';
  successMessage: string = '';
  errors: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Xử lý file avatar, có thể upload lên server hoặc xử lý trực tiếp
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = e.target.result; // Cập nhật avatar trong user
      };
      reader.readAsDataURL(file);
    }
  }
  getUser(): void {
    this.authService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Gán dữ liệu người dùng vào biến
      },
      error: (error) => {
        this.errorMessage = 'Unable to load user information. Please try again later.';
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/signin']);
        }
      }
    });
  }

  updateUser(): void {
    this.authService.updateUser(this.user).subscribe({
      next: (response) => {
        this.successMessage = 'Successfully updated!';
        this.errorMessage = '';
      },
      error: (errors) => {
        this.errors = errors;
        this.errorMessage = 'Unable to update information. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
