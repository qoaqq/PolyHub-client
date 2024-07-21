import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: any = null; // Khởi tạo user là null
  menuOpen = false; // Biến để kiểm soát trạng thái menu thả xuống

  constructor(private authService: AuthService,private router: Router) {}
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
    this.authService.getUserInfo().subscribe(user => this.user = user);
  }

  logout() {
    this.authService.signout().subscribe(() => {
      this.isLoggedIn = false;
      this.user = null;
      this.router.navigate(['/']);
    });
  }
}