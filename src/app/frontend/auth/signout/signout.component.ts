import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onSignout() {
    this.authService.signout().subscribe({
      next: () => {
        // Redirect đến trang đăng nhập hoặc trang chính sau khi đăng xuất
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('Signout failed', error);
        // Xử lý lỗi nếu cần
      }
    });
  }
}
