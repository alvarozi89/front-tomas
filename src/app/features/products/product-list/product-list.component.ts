
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../core/services/product.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;
  formValue: FormGroup;
  filtroText: string = '';
  top5Products: Product[] = [];
  productActive: Product[] = [];

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.formValue = this.fb.group({
      name: [''],
      price: [''],
      category: [''],
      quantity: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadTop5Products();
    this.listProductsActive();
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

  search(form: any): void {
    if (this.filtroText.trim()) {
      this.productService.searchProducts(this.filtroText).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        error => {
          console.error('Error searching products', error);
        }
      );
    } else {
      this.loadProducts();
    }
  }

  getProductId(product: Product): void {
    this.selectedProduct = product;
  }

  deleteProduct(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = null;
          Swal.fire({
            icon: 'error',
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado exitosamente',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          console.error('Error deleting product', error);
        }
      );
    }
  }

  loadTop5Products(): void {
    this.productService.getTop5Products().subscribe(
      (products: Product[]) => {
        this.top5Products = products;
      },
      error => {
        console.error('Error loading top 5 products', error);
      }
    );
  }

  listProductsActive(): void {
    this.productService.getProductActive().subscribe(
      (products: Product[]) => {
        this.productActive = products;
      },
      error => {
        console.error('Error loading active products', error);
      }
    );
  }


  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.formValue.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      const updatedUser: Partial<Product> = { ...this.selectedProduct, ...this.formValue.value };
      this.productService.updateProduct(this.selectedProduct.id, updatedUser).subscribe(
        (response: Product) => {
          this.loadProducts();
          this.selectedProduct = null;
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            text: 'El usuario ha sido actualizado exitosamente',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          console.error('Error updating user', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el usuario',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }
}
