import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errors: any = {};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/user']);
    }
  }

  onSubmit() {
    this.authService.signin(this.email, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          // Lưu token vào localStorage
          localStorage.setItem('token', response.token);

          // Redirect đến trang chính hoặc trang khác sau khi đăng nhập thành công
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (errors) => {
        this.errors = errors;
        this.errorMessage = 'Login failed. Please check your credentials.';
      },
    });
  }
}
