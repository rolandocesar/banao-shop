import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../product/products.service';
import { Product } from '../../../product/interfaces/product-interfaces';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {

  myform: FormGroup = this.fb.group({
    'terminus': [ '', [ Validators.required ] ]
  });

  products: Product[] = [];

  // Search
  isValidSearch: boolean = false;
  countInvalidRequest: number = 0;
  msg: string = '';
  // msgNormal: string = 'no results';
  // msgAfterTwoTime: string = 'puede que exista o no, intenta en singular EJEMPLO: ron y no rones';

  constructor( private router: Router,
               private prodServ: ProductsService,
               private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.prodServ.initProds()
      .subscribe( resp => {
        if ( resp.total > 0 ) {
          resp.products.forEach(p => this.products.push(p));
        }
      })
  }

  // Search
  search() {
    const { terminus } = this.myform.value;
    if ( !terminus ) {
      return;
    }
    // make search petition
    this.prodServ.searchProduct( terminus )
      .subscribe( resp => {
        if ( resp.results.length > 0 ) {
          // console.log('HOME Component: ', resp);
          // console.log('Successfull search')
          this.router.navigateByUrl('/dashboard/search');
        } else if ( resp.results.length === 0 ) {
          this.isValidSearch = true;
          this.countInvalidRequest += 1;
          this.customMsg();
        } else {
          Swal.fire( 'Error', resp.toString(), 'error' );
        }
      })

    this.myform.reset();
  }

  customMsg() {
    if ( this.countInvalidRequest > 2 ) {
      this.msg = 'a lo mejor existe en singular Ej: ron y no rones';
    } else {
      this.msg = 'no results';
    }
    setTimeout(() => {
        this.msg = '';
    }, 1700);
  }

  // Cart
  goToCart() {
    this.router.navigateByUrl('/dashboard/cart');
  }



}
