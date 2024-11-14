import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  mensaje_ok!: string;
  mensaje_error!: string;
  userName: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
     username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log("ingreso a login");
      // Llama al servicio de autenticación
      this.authService.login(loginData).subscribe({
        next: (response) => {
          // Manejo del login exitoso
          this.mensaje_ok = 'Login exitoso';
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', loginData.username);

          this.mensaje_error = '';
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            text: 'El usuario ha sido autenticado exitosamente',
            confirmButtonText: 'Aceptar'
          });

          this.router.navigate(['/home']);
        },
        error: (error) => {
          // Manejo del error en el login
          this.mensaje_error = 'Error en la autenticación: ';
          this.mensaje_ok = '';
        }
      });
    } else {
      this.mensaje_error = 'Datos inválidos. Por favor, revisa el formulario.';
      this.mensaje_ok = '';
    }
  }

  cerrarAlerta(): void {
    this.mensaje_error = '';
  }
}
