import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderRegisterComponent } from './order-register/order-register.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderRegisterComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrdersModule { }
