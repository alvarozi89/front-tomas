import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Order, OrderDto } from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/Product';
import { User } from '../../../shared/models/User';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-order-register',
  templateUrl: './order-register.component.html',
  styleUrl: './order-register.component.css'
})
export class OrderRegisterComponent {

  ordersDto: OrderDto[] = [];
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  formValue: FormGroup;
  createForm: FormGroup;
  filtroText: string = '';
  products : Product[] = [];
  users: User[] = [];

  constructor(private authService: AuthService,private orderService: OrderService,private productService: ProductService, private fb: FormBuilder) {
    this.formValue = this.fb.group({
      quantity: [''],
      totalPrice: ['']
    });

    this.createForm = this.fb.group({
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      productId: ['', Validators.required],
      userId: ['', Validators.required],

    });

  }
  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
    this.loadUsers();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Error loading orders', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Error loading users', error);

      }
    );
  }

  search(form: any): void {
    if (this.filtroText.trim()) {
      // Implement search logic if needed
    } else {
      this.loadOrders();
    }
  }
  getOrderId(order: Order): void {
    this.selectedOrder = order;
  }


  editOrder(order: Order): void {
    this.selectedOrder = order;
    this.formValue.patchValue(order);
  }



  createOrder(): void {
    const newOrder: OrderDto = this.createForm.value;
    console.log(newOrder);
    this.orderService.createOrder(newOrder).subscribe(
      (order: OrderDto) => {
        this.loadOrders();
        this.createForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Orden creada',
          text: 'La orden ha sido creada exitosamente',
          confirmButtonText: 'Aceptar'
        });
      },
      error => {
        console.error('Error creating order', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la orden',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}


