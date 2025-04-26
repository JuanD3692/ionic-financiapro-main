import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { MessageFlashComponent } from '../shared/components/message-flash/message-flash.component';
import { MessageFlashService } from '../shared/components/message-flash/message-flash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MessageFlashComponent]
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

  constructor(private registerService: RegisterService, private router: Router, private messageFlashService: MessageFlashService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.messageFlashService.danger('Las contraseñas no coinciden', 2000);
      return;
    }

    this.registerService.register(this.registerData).subscribe({
      next: () => {
        this.messageFlashService.success('Registro existo por favor inicia seción', 2000);
        console.log("Registro exitoso");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.messageFlashService.danger(err, 2000);
        console.error("Error en el registro:", err);
      }
    });
  }

}
