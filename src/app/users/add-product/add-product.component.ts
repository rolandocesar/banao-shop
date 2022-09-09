import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { tap } from 'rxjs';
import { Category } from 'src/app/category/interfaces/categories.interfaces';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../category/categories.service';
import { ProductsService } from '../../product/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories: Category[] = [];


  myform: FormGroup = this.fb.group({
    'name': [ '', [ Validators.required ] ],
    'price': [ '', [ Validators.required ] ],
    'category': [ '', [ Validators.required ] ],
    'desc': [ '', [  ] ],
    'amount': [ '1', [ Validators.min(1) ] ],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private cateServ: CategoriesService,
               private prodServ: ProductsService,
  ) { }

  ngOnInit(): void {
    this.categories = this.cateServ.getCategories;
  }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  addProduct() {
    if ( this.myform.invalid ) {
      return;
    }
    const data = this.myform.value;
    console.log(data);
    this.prodServ.createProduct( data )
      .subscribe( resp => {
        if ( resp.product ) {
          this.router.navigateByUrl('/user/');
        } else {
          Swal.fire( 'Error', resp.toString(), 'warning' );
        }
      })

  }

  comeBack() {
    this.router.navigateByUrl('/user/');
  }

  

}
