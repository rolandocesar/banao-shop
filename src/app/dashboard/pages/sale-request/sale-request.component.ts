import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../product/interfaces/product-interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-request',
  templateUrl: './sale-request.component.html',
  styleUrls: ['./sale-request.component.css']
})
export class SaleRequestComponent implements OnInit {

  cart: any[] = [];

  public nameLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  myform: FormGroup = this.fb.group({
    'name': [ '', [ Validators.required ] ],
    'lastname': [ '', [ Validators.required, Validators.pattern( this.nameLastNamePattern ) ] ],
    'mobile': [ '', [ Validators.required, Validators.minLength(8) ] ],
    // 'email': [ '', [ Validators.pattern(this.emailPattern) ] ],
    'address': [ '', [ Validators.required, Validators.minLength(6) ] ],
  })

  constructor( private router: Router,
      private fb: FormBuilder,
      private cartService: CartService
  ) { }


  ngOnInit(): void {
    const cartArr = this.cartService.getCart;
    cartArr.forEach( (p, i) => {
      let obj = {
        name: p.name,
        price: p.price
      }
      this.cart.push( obj );
    } )

  }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  comeBack() {
    this.router.navigateByUrl('/dashboard/cart');
  }

  sendRequest() {
    const data = this.myform.value;
    
    let emailCart: any = [];
    this.cart.forEach( (p: any) => emailCart.push( {name: p.name} ) );
    data.cart = emailCart;
    console.log(data);
    // TODO: decide which library will be used to send sale request
    this.cartService.sendEmailRequest( data )
      .subscribe( resp => {
        if ( resp.ok ) {
          Swal.fire( 'Email', 'Solicitud de compra recibida', 'success' );
        } else {
          Swal.fire('Error', resp.toString(), 'error');
        }
      })
  }

}
