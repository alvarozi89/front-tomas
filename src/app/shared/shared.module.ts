import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
