import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { MessageFlashComponent } from '../shared/components/message-flash/message-flash.component';
import { MessageFlashService } from '../shared/components/message-flash/message-flash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MessageFlashComponent,
  ],
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private messageFlashService: MessageFlashService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        document: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{8,10}$')],
        ],
        username: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['email'])
        return 'Debe ser un correo electrónico válido';
      if (control.errors['minlength'])
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['pattern']) {
        if (field === 'password')
          return 'La contraseña debe contener al menos una mayúscula y un número';
        if (field === 'phone') return 'El teléfono debe tener 10 dígitos';
        if (field === 'document')
          return 'El documento debe tener entre 8 y 10 dígitos';
      }
    }
    return '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        name: this.registerForm.value.name,
        phone: this.registerForm.value.phone,
        document: this.registerForm.value.document,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.registerService.register(userData).subscribe({
        next: () => {
          this.messageFlashService.success(
            'Registro exitoso por favor inicia sesión',
            2000
          );
          this.router.navigate(['/login']);
        },
      });
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
