import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './updateProduct/update-product/update-product.component';
import { AddCategoryComponent } from './addCategory/add-category/add-category.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    MyProfileComponent,
    AddProductComponent,
    UpdateProductComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    DashboardModule
  ]
})
export class UsersModule { }
