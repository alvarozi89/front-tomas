import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)},
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] },
   {path : 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent },  // Agrega la ruta
  { path: '**', redirectTo: '' } // Redirige cualquier ruta desconocida a la ruta de autenticación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
