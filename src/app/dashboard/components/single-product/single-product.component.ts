import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Product } from '../../../product/interfaces/product-interfaces';
import { CartService } from '../../services/cart.service';
import { ModalComponent } from '../modal/modal.component';

declare var window: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @Input() product!: Product;
  conditionToWasAdded: boolean = false;
  wasAdded: boolean = false;

  // Modal
  isOpenModal: boolean = false;
  modal: any;

  constructor( private cartService: CartService,

    ) { }

  ngOnInit(): void {

    this.modal = new window.bootstrap.Modal(
      
    )

    this.cartService.msgSameProduct.subscribe( value => {
      if ( value ) {
        console.log('In OnInit if value is true');
        this.conditionToWasAdded = true;
        Swal.fire('Info', 'Este producto ya lo has agregado al carrito anteriormente', 'warning');
      } else {
        console.log('In OnInit if value is false');
        this.conditionToWasAdded = false;
      }
    } )
  }

  addToCart( event: any ) {
    const { id } = event.target;
    this.cartService.addProductToCart( id );
    if ( !this.conditionToWasAdded ) {
      
      this.wasAdded = !this.wasAdded;
      setTimeout(() => {
        this.wasAdded = !this.wasAdded;
      }, 1400);

    }


  }

  // Clich Event over one Image Product
  seeImageProduct( event: any ) {
    const id = event.target.id;
    console.log(id);
  }

  // Modal
  // openModal() {
  //   console.log('Open Modal');
  //   this.changeOpenModal();
  // }

  // changeOpenModal() {
  //   this.isOpenModal = !this.isOpenModal;
  // }

  openModal() {
    console.log('Opening Modal From single-product.component: ');
    // this.dialogRef.open( ModalComponent );
  }

}
