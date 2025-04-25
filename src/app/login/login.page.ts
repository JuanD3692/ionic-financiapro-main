import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { ILogin } from './interfaces/ILogin';
import { IResponse } from './interfaces/IResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  mobileMenuOpen = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSubmit() {
    const loginData: ILogin = { username: this.username, password: this.password };

    this.loginService.login(loginData).subscribe(
      (response: IResponse) => {
        this.loginService.handleLoginResponse(response);
        this.router.navigate(['/tabs/tab1']); 
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

}
