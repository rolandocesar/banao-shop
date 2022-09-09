import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';


import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { SaleRequestComponent } from './pages/sale-request/sale-request.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SingleCategoryComponent } from './components/single-category/single-category.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    SingleProductComponent,
    CartComponent,
    SaleRequestComponent,
    CategoriesComponent,
    SingleCategoryComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
  ], 
  exports: [
    SingleProductComponent,
  ]
})
export class DashboardModule { }
