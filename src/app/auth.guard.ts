import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Cho phép truy cập
    } else {
      this.router.navigate(['/signin']); // Chuyển hướng về trang đăng nhập
      return false; // Không cho phép truy cập
    }
  }
}
