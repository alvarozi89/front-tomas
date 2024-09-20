import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRegisterComponent } from './product-register/product-register.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'register', component: ProductRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
