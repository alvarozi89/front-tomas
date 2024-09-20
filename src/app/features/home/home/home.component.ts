import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();  // Obtén el nombre del usuario
    console.log('token home:', this.authService.getToken());  // Agrega este log para verificar que el nombre del usuario se está obteniend
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige a la página de login
    Swal.fire({
      icon: 'error',
      title: 'Cierra sesión',
      text: 'La sesión ha sido cerrada',
      confirmButtonText: 'Aceptar'
    });
  }
}
