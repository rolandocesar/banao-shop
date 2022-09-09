import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Product } from 'src/app/product/interfaces/product-interfaces';
import { ProductsService } from 'src/app/product/products.service';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../../category/categories.service';
import { Category } from '../../../category/interfaces/categories.interfaces';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategories!: Category[];
  prodsBelongCate: Product[] = [];

  // Search
  foundCate!: Category[];
  showH3: boolean = false;

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
               private fb: FormBuilder,
               private cateService: CategoriesService,
               private modalService: ModalService,
  ) { }


  ngOnInit(): void {
    const categs = this.cateService.getCategories;
    if ( categs.length === 0 ) {
      this.cateService.initCategories()
        .subscribe( resp => {
          if ( resp.total > 0 ) {
            this.allCategories = resp.categories;
          }
        })
    } else {
      this.allCategories = categs;
    }

    // Listen to Modal
    this.modalService.subjectChange
      .subscribe( value => {
        console.log('In Category component');
        if ( value ) {
          this.checkWorks();
        } else {
          console.log('Value is False');
        }
      })
  }

  checkWorks() {
    console.log('Yesss');
  }

  // Search Process
  searchCate() {
    const { terminus } = this.myform.value;
    if ( !terminus ) {
      return;
    }
    console.log(terminus);
    this.cateService.searchCategoriesByTerminus( terminus )
      .pipe (
        tap(
            (_) => { this.myform.reset(); this.prodsBelongCate = [] }
        )
      )
      .subscribe( resp => {
        if ( resp.results.length > 0 ) {
          this.foundCate = resp.results;
          this.showH3 = true;
        } else if ( resp.results.length === 0 ) {
          this.showH3 = false;
          this.countInvalidRequest += 1;
          this.customMsg();

        } else {
          Swal.fire('Error', resp.toString(), 'error');
          this.showH3 = false;
        }
      })
  }

  customMsg() {
    if ( this.countInvalidRequest > 2 ) {
      this.msg = 'a lo mejor existe en singular Ej: ron y no rones';
    } else {
      this.msg = 'no results';
    }
    setTimeout(() => {
        this.msg = '';
    }, 1800);
  }

  // Cart
  goToCart() {
    this.router.navigateByUrl('/dashboard/cart');
  }

  getProdsBelongCate( id: string ) {
    if ( this.prodsBelongCate.length > 0 ) {
      this.prodsBelongCate = [];
    }
    // console.log(id);
    this.cateService.getAllProdsBelongCate( id )
      .subscribe( resp => {
        if ( resp.total > 0 ) {
          resp.products.forEach( p => this.prodsBelongCate.push(p));
        } else {
          Swal.fire( 'Error', resp.toString(), 'warning' );
        }
      })
  }

}
