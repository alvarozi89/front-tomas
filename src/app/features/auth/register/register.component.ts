import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formValue!: FormGroup;
  mensaje_ok!: string;
  mensaje_error!: string;
  usuarioModel:User = new User();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required]]
    });
  }

  registrarUsuario(): void {

    this.usuarioModel.nombre = this.formValue.value.nombre;
    this.usuarioModel.username = this.formValue.value.username;
    this.usuarioModel.password = this.formValue.value.password;

    // El campo role necesita un objeto con el ID del rol
    this.usuarioModel.role =  this.formValue.value.role ;

    // Validación simple para el campo nombre
    if (this.usuarioModel.nombre === "") {
      this.mensaje_error = "El campo nombre no puede estar vacío";
    } else {
      // Cuando la información esté lista, llama al servicio para crear el usuario
      console.log(this.usuarioModel);
      this.authService.register(this.usuarioModel)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: 'El usuario ha sido registrado exitosamente',
              confirmButtonText: 'Aceptar'
            });
            this.mensaje_ok = "Usuario registrado correctamente";
            this.formValue.reset(); // Resetea el formulario después de crear el usuario
            this.router.navigate(['']); // Redirige a la página deseada después del registro
          },
          error: (err) => {
            console.log(err);
            this.mensaje_error = "Ocurrió un error al registrar el usuario";
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el usuario. Inténtalo de nuevo.',
              confirmButtonText: 'Aceptar'
            });
          }
        });
    }
  }

  cerrarAlerta(): void {
    this.mensaje_error = '';
    this.mensaje_ok = '';
  }
}


