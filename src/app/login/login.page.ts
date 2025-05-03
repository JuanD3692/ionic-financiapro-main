import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { ILogin } from './interfaces/ILogin';
import { IResponse } from './interfaces/IResponse';
import { MessageFlashComponent } from '../shared/components/message-flash/message-flash.component';
import { MessageFlashService } from '../shared/components/message-flash/message-flash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MessageFlashComponent],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  mobileMenuOpen = false;
  showPassword = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageFlashService: MessageFlashService
  ) {}

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSubmit() {
    const loginData: ILogin = {
      username: this.username,
      password: this.password,
    };

    this.loginService.login(loginData).subscribe(
      (response: IResponse) => {
        this.messageFlashService.success('Inicio de sesión exitoso', 1000);
        this.loginService.handleLoginResponse(response);
        this.router.navigate(['/tabs/']);
      },
      (error) => {
        this.messageFlashService.danger(
          'Usuario o contraseña incorrectos',
          3000
        );
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}
