
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Component } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../core/services/product.service';


@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent {

  formValue!: FormGroup;
  mensaje_ok!: string;
  mensaje_error!: string;
  productModel:Product = new Product();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  registrarProducto(): void {

    this.productModel.name = this.formValue.value.name;
    this.productModel.price = this.formValue.value.price;
    this.productModel.quantity = this.formValue.value.quantity;


    if (this.productModel.name=== "") {
      this.mensaje_error = "El campo nombre no puede estar vacío";
    } else {
      // Cuando la información esté lista, llama al servicio para crear el usuario
      this.productService.register(this.productModel)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Producto creado',
              text: 'El producto ha sido registrado exitosamente',
              confirmButtonText: 'Aceptar'
            });
            this.mensaje_ok = "Producto registrado correctamente";
            this.formValue.reset();
          },
          error: (err) => {
            console.log(err);
            this.mensaje_error = "Ocurrió un error al registrar el usuario";
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el producto. Inténtalo de nuevo.',
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
