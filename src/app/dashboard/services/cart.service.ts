import { EventEmitter, Injectable, Output } from '@angular/core';
import { Product } from '../../product/interfaces/product-interfaces';
import { ProductsService } from '../../product/products.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Email } from '../interfaces/email.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _baseUrl = environment.baseUrl;
  cart: Product[] = [];
  allProducts: Product[] = [];
  private _sameProd: boolean = false;
  @Output() msgSameProduct = new EventEmitter<boolean>(this._sameProd);

  get getCart() {
    return [...this.cart];
  }

  constructor( private prodService: ProductsService,
      private http: HttpClient
    ) {
    prodService.initProds()
      .subscribe( resp => {
        if ( resp.total >  0 ) {
          resp.products.forEach( p => this.allProducts.push(p) );
        }
      } )
    console.log('CONSTRUCTOR: AllProds: ', this.allProducts);
    if ( this.cart.length === 0 ) {
      const item = localStorage.getItem('cart') || '';
      if ( item !== '' ) {
        this.cart = JSON.parse( item );
        console.log('Cart At the beggining: ', this.cart);
      }
    }
  }

  // Add a single Product to cart
  addProductToCart( id: string ) {
    console.log('ID: ', id);
    // checking wheter product exists already in cart
    let check = true;  // variable to handle wheter exists duplicate or not
    this.cart.forEach( p => {
      if ( p.id === id ) {
        console.log('Checking in cartService duplicate');
        this._sameProd = true;
        check = false;
        this.msgSameProduct.emit(this._sameProd);
        console.log(this.cart);
        setTimeout(() => {
          this._sameProd = false;
          this.msgSameProduct.emit(this._sameProd);
        }, 2000);
      }
    } )
    // adding a product if both ID are equal
    if ( check ) {
      this.allProducts.forEach( p => {
        if ( p.id === id ) {
          this.cart.push( p );
        }
      } )
      console.log(this.cart);
      localStorage.setItem('cart', ( JSON.stringify(this.cart) ) );
    }

  }

  takeOffProductOfCart( id: string ) {
    this.cart = this.cart.filter( p => p.id !== id );
    localStorage.setItem('cart', ( JSON.stringify(this.cart) ) );
  }

  // Email, sale request
  sendEmailRequest( body: object ): Observable<Email> {
    const url = `${this._baseUrl}/email/`;
    return this.http.post<Email>( url, body )
      .pipe(
        tap( resp => {
          console.log(resp);
        }),
        map( resp => resp),
        catchError( err => of(err.error.msg) )
      )
  }


}
