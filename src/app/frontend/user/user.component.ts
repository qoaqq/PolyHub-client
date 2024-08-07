import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any = {}; // Biến lưu trữ thông tin người dùng
  successMessage: string | null = null;
  errorMessage: string | null = null;
  errors: any = {};
  showChangePassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.getUser();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 5000); // 5 giây
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // 5 giây
  }

  getUser(): void {
    this.authService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Gán dữ liệu người dùng vào biến
      },
      error: (error) => {
        this.errorMessage =
          'Unable to load user information. Please try again later.';
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/signin']);
        }
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = e.target.result; // Lưu base64 vào avatar
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser(): void {
    this.authService.updateUser(this.user).subscribe({
      next: (response) => {
        this.showSuccess('Successfully updated!');
        this.errorMessage = '';
      },
      error: (errors) => {
        this.errors = errors;
        this.showError('Unable to update information. Please try again.');
        this.successMessage = '';
      },
    });
  }

}
