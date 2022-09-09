import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../product/interfaces/product-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts!: Product[];
  isThereCartProducts: boolean = true;

  constructor( private cartService: CartService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCart;
    if ( this.cartProducts.length === 0 ) {
      const items = localStorage.getItem('cart') || '';
      if ( items !== '' ) {
        this.cartProducts = JSON.parse(items);
      }
    }
    console.log('On Cart Component: ', this.cartProducts);
    this.calculateLenghtCart();
    
  }

  calculateLenghtCart() {
    if ( this.cartProducts.length === 0 ) {
      this.isThereCartProducts = false;
    } else {
      this.isThereCartProducts = true;
    }
  }

  unMount( event: any ) {
    const { id } = event.target;
    console.log(id);

    // take off of cartProducts
    this.cartProducts = this.cartProducts.filter( p => p.id !== id);
    this.cartService.takeOffProductOfCart( id );
    this.calculateLenghtCart();
    
  }

  comeBack() {
    this.router.navigateByUrl('/dahboard/');
  }

  saleRequest() {
    this.router.navigateByUrl('/dashboard/saleRequest');
  }

}
