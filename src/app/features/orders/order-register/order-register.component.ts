import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/User';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-register',
  templateUrl: './order-register.component.html',
  styleUrl: './order-register.component.css'
})
export class OrderRegisterComponent {

  orders: Order[] = [];
  selectedOrder: Order | null = null;
  formValue: FormGroup;
  createForm: FormGroup;
  filtroText: string = '';

  constructor(private authService: OrderService, private fb: FormBuilder) {
    this.formValue = this.fb.group({
      quantity: [''],
      totalPrice: ['']
    });

    this.createForm = this.fb.group({
      quantity: [''],
      totalPrice: [''],
      product: this.fb.group({
        id: ['']
      }),
      user: this.fb.group({
        id: ['']
      })
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.authService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Error loading orders', error);
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
    const newOrder: Order = this.createForm.value;
    this.authService.createOrder(newOrder).subscribe(
      (order: Order) => {
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


