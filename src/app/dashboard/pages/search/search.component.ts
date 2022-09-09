import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/product/interfaces/product-interfaces';
import { ProductsService } from '../../../product/products.service';
import { Router } from '@angular/router';
import { Product } from '../../../product/interfaces/product-interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  foundProdsFromSearch: Result[] = [];

  constructor( private prodServ: ProductsService,
      private router: Router
    ) {

  }

  ngOnInit(): void {
    console.log('OnInit in SearchComponent');
    const search = this.prodServ.getSearch;
    
    if ( search.length === 0 ) {
      console.log('Nothing');
      const items = localStorage.getItem('search') || '';
      if ( items !== '' ) {
        const arr: Array<any> = JSON.parse( items );
        arr.forEach( p => this.foundProdsFromSearch.push( p ) )
      }
    } else {
      search.forEach( p => this.foundProdsFromSearch.push( p ) );
    }
  }

  // Cart
  goToCart() {
    this.router.navigateByUrl('/dashboard/cart');
  }

}
