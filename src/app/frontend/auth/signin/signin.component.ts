import {
  Component
} from '@angular/core';
import { AuthService } from '../../../auth.service';
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

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signin(this.email, this.password).subscribe({
      next: (response) => {
        // Lưu token vào localStorage nếu cần
        localStorage.setItem('token', response.token);

        // Redirect đến trang chính hoặc trang khác sau khi đăng nhập thành công
        this.router.navigate(['/']);
        alert('login succsesss');
      },
      error: (errors) => {
        this.errors = errors;
      }
    });
  }
}
