import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterPage implements OnInit {


  registerData = {
    name: "",
    document: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  }

  errorMessage: string = "";

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    this.registerService.register(this.registerData).subscribe({
      next: () => {
        console.log("Registro exitoso");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Error en el registro:", err);
        this.errorMessage = "Error al registrar. Por favor, inténtelo de nuevo.";
      }
    });
  }

}
