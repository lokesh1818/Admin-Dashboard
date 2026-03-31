import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';   

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    LoginComponent   
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name || 'Admin';
  }
}