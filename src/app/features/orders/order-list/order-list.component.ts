import { OrderService } from './../../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../shared/models/User';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  users: User[] = [];;
  selectedUser: User | null = null;
  formValue: FormGroup;
  filtroText: string = '';

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.formValue = this.fb.group({
      nombre: [''],
      username: ['']
    });
  }

  ngOnInit(): void {
    this.loadTopUsers();
  }

  loadTopUsers(): void {
    this.orderService.getOrdersTop().subscribe(
      (data: any[]) => {
        this.users = data.map(userData => ({
          id: userData.id,
          nombre: userData.nombre,
          username: userData.username,
          password: userData.password,
          orders: userData.orders || [],
          role: userData.role
        }));
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user; // Asigna el usuario seleccionado
  }

  deleteUser(): void {
    if (this.selectedUser) {
      this.authService.deleteUser(this.selectedUser.id).subscribe(
        () => {
          this.loadTopUsers();
          this.selectedUser = null;
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado',
            text: 'El usuario ha sido eliminado exitosamente',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          console.error('Error deleting user', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No fue posible eliminar el usuario',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.formValue.patchValue({
      nombre: user.nombre,
      username: user.username
    });
  }

  updateUser(): void {
    if (this.selectedUser) {
      const updatedUser = {
        id: this.selectedUser.id,
        nombre: this.formValue.get('nombre')?.value,
        username: this.formValue.get('username')?.value
      };

      this.authService.updateUser(updatedUser.id, updatedUser).subscribe(
        () => {
          this.loadTopUsers();
          this.selectedUser = null;
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado exitosamente',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          console.error('Error updating user', error);
          Swal.fire({
            icon: 'error',
            title: 'No fue posible actualizar',
            text: 'El usuario no ha sido actualizado',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
}
