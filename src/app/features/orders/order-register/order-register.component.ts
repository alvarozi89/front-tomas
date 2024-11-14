import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Order, OrderDto } from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/Product';
import { User, UserDTO, UserUpdateDTO } from '../../../shared/models/User';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-order-register',
  templateUrl: './order-register.component.html',
  styleUrls: ['./order-register.component.css']
})
export class OrderRegisterComponent implements OnInit, OnDestroy {

  ordersDto: OrderDto[] = [];
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  formValue: FormGroup;
  createForm: FormGroup;
  filtroText: string = '';
  products: Product[] = [];
  users: User[] = [];
  usersTop: UserDTO[] = [];
  discountEnabled: boolean = false;
  remainingTime: number = 40;
  timerInterval: any;
  randomOrderActive: boolean = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.formValue = this.fb.group({
      quantity: [''],
      totalPrice: ['']
    });

    this.createForm = this.fb.group({
      quantity: ['', Validators.required],
      totalPrice: [{ value: '', disabled: true }, Validators.required],
      unitPrice: [{ value: '', disabled: true }],
      productId: ['', Validators.required],
      userId: ['', Validators.required],
      discount: [{ value: 0, disabled: true }],
      discountUser: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
    this.loadUsers();
    this.loadTopUsers();
    this.createForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.createForm.get('productId')?.valueChanges.subscribe(() => this.updateUnitPrice());
    this.startDiscountTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
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

  startDiscountTimer(): void {
    this.discountEnabled = true;
    this.createForm.patchValue({ discount: 10 });

    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.discountEnabled = false;
        this.createForm.patchValue({ discount: 0, discountUser: 0 });
        clearInterval(this.timerInterval);
      }
      this.calculateTotalPrice();
    }, 1000);
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

  loadTopUsers(): void {
    this.orderService.getOrdersTop().subscribe(
      (data: any[]) => {
        this.usersTop = data.map(userData => ({
          id: userData.id,
          nombre: userData.nombre,
          username: userData.username,
          password: userData.password,
          orders: userData.orders || [],
          role: userData.role,
          isFrequentCustomer: (userData.orders || []).length > 5,
          discountUser: (userData.orders || []).length > 5 ? 5 : 0
        }));
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }
  onUserChange(): void {
    const selectedUserId = this.createForm.get('userId')?.value;
    const selectedUser = this.usersTop.find(user => user.id === selectedUserId);
    this.createForm.patchValue({
      discountUser: selectedUser?.isFrequentCustomer ? 5 : 0
    });
    this.calculateTotalPrice();
  }

  updateUnitPrice(): void {
    const selectedProductId = this.createForm.get('productId')?.value;
    const selectedProduct = this.products.find(product => product.id === selectedProductId);

    if (selectedProduct) {
      this.createForm.patchValue({
        unitPrice: selectedProduct.price
      });
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    const unitPrice = this.createForm.get('unitPrice')?.value || 0;
    const quantity = this.createForm.get('quantity')?.value || 0;
    const discount = this.createForm.get('discount')?.value || 0;
    const discountUser = this.createForm.get('discountUser')?.value || 0;

    let totalPrice = unitPrice * quantity;
    if (discount > 0) {
      totalPrice -= (totalPrice * discount) / 100;
    }
    if (discountUser > 0) {
      totalPrice -= (totalPrice * discountUser) / 100;
    }

    this.createForm.patchValue({ totalPrice });
  }

  createOrder(): void {
    const newOrder: OrderDto = this.createForm.getRawValue();
    console.log(newOrder);
    this.orderService.createOrder(newOrder).subscribe(
      (order: OrderDto) => {
        this.loadOrders();
        this.createForm.reset({
          quantity: '',
          unitPrice: '',
          discount: this.discountEnabled ? 10 : 0,
          discountUser: 0,
          totalPrice: '',
          productId: '',
          userId: ''
        });
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

  activateRandomOrder(): void {
    if (this.discountEnabled) {
      this.randomOrderActive = true;
      this.createForm.patchValue({ discount: 50 });

      const randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
      const randomQuantity = Math.floor(Math.random() * 10) + 1;
      const randomUser = this.usersTop[Math.floor(Math.random() * this.usersTop.length)];

      if (randomProduct && randomUser) {
        // Asigna el ID del producto, cantidad y ID del usuario aleatorio al formulario
        this.createForm.patchValue({
          productId: randomProduct.id,
          unitPrice: randomProduct.price,
          quantity: randomQuantity,
          userId: randomUser.id
        });

        // Aplica el descuento adicional si el usuario es cliente frecuente
        if (randomUser.isFrequentCustomer) {
          this.createForm.patchValue({ discountUser: 5 }); // Descuento adicional del 5%
        } else {
          this.createForm.patchValue({ discountUser: 0 });
        }
      }

      this.calculateTotalPrice(); // Recalcula el precio total con el descuento
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Tiempo de descuento expirado',
        text: 'El pedido aleatorio solo está disponible dentro del tiempo de descuento.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
