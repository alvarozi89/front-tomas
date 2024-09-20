import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductRegisterComponent } from './product-register/product-register.component'; // Importa FormsModule



@NgModule({
  declarations: [
    ProductListComponent,
    ProductRegisterComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductsModule { }
