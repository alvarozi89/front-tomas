import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRegisterComponent } from './order-register/order-register.component';

const routes: Routes = [
  {path: 'list', component: OrderListComponent},
  {path: 'register', component: OrderRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
