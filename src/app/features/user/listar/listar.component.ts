import { Component } from "@angular/core";
import { User, UserUpdateDTO } from "../../../shared/models/User";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  users: User[] = [];
  selectedUser: User | null = null;
  formValue: FormGroup;
  filtroText: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.formValue = this.fb.group({
      nombre: [''],
      username: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }



  loadUsers(): void {
   this.authService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  search(form: any): void {
    if (this.filtroText.trim()) {
      this.authService.searchUsers(this.filtroText).subscribe(
        (data: User[]) => {
          this.users = data;
        },
        error => {
          console.error('Error searching products', error);
        }
      );
    } else {
      this.loadUsers();
    }
  }

  getUserId(user: User): void {
    this.selectedUser = user;
  }

  deleteUser(): void {
    debugger
    if (this.selectedUser) {
      this.authService.deleteUser(this.selectedUser.id).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = null;
          Swal.fire({
            icon: 'error',
            title: 'User eliminado',
            text: 'El usuario ha sido eliminado exitosamente',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          console.error('Error deleting user', error);
          Swal.fire({
            icon: 'error',
            title: 'No fue posible eliminar',
            text: 'El usuario no ha sido eliminado',
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
      const updatedUser: UserUpdateDTO = {
        nombre: this.formValue.get('nombre')?.value || '',
        username: this.formValue.get('username')?.value || ''
      };
      this.authService.updateUser(this.selectedUser.id, updatedUser).subscribe(
        (response: UserUpdateDTO) => {
          this.loadUsers();
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
            title: 'Error',
            text: 'No se pudo actualizar el usuario',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
}
