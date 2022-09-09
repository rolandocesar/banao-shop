import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../auth/interfaces/auth-interface';
import { ProductsService } from '../../product/products.service';
import { Product } from '../../product/interfaces/product-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { switchMap, tap } from 'rxjs';
import { CategoriesService } from '../../category/categories.service';
import { Category } from '../../category/interfaces/categories.interfaces';


interface AddCate {
  name: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {

  userAuthenticated!: User;
  products: Product[] = [];
  validDeletion: boolean = false;

  // Variables Update
  wantToUpdate: boolean = false;
  idProduct: string = '';
  nameProduct: string = '';

  // Variables Add Category
  allCategories!: Category[];
  showHideFormAddCate: boolean = false;

  @Input() updateBody!: object;


  myform: FormGroup = this.fb.group({
    product: [ '', [ Validators.required ] ],
  })

  selectForm: FormGroup = this.fb.group({
    selectedProduc: [ '', [ Validators.required ] ],
  })
  

  constructor( private authService: AuthService,
              private router: Router,
              private prodServ: ProductsService,
              private cateService: CategoriesService,
              private fb: FormBuilder,
  ) {}


  ngOnInit(): void {
    const categs = this.cateService.getCategories;
    if ( categs.length ) {
      this.allCategories = categs;
    } else {
      this.cateService.initCategories()
        .subscribe( resp => {
          if ( resp.total ) {
            this.allCategories = resp.categories;
          }
        })
    }
    this.userAuthenticated = this.authService.userProps;
    const prods = this.prodServ.products;
  
    prods.forEach( p => {
      this.products.push( p );
    } )

    // this.selectForm.get('selectedProduc')?.valueChanges
    //   .pipe(
    //     tap( (_) => {
    //       console.log('here');
    //       // console.log(this.selectForm.value);
    //     } )
        
    //   )
    
  }

  // Edit User Profile
  editProfile() {
    this.router.navigateByUrl('/user/editProfile');
  }

  // Agreggate Product
  addProd() {
    this.router.navigateByUrl('/user/addProd');
  }

  // Agreggate Category
  setFormCate() {
    this.showHideFormAddCate = !this.showHideFormAddCate;
  }

  addCate( bodyForm: any ) {
    const body = bodyForm;
    // checking duplicate
    let check = true; // variable of type cheching duplicate category
    this.allCategories.forEach( cate => {
      if ( cate.name.toLocaleLowerCase() === body.name.toLocaleLowerCase() ) {
        check = false;
        Swal.fire('Info', `Ya ha agregado una categoria con nombre ${body.name}`, 'info');
      }
    } )

    if ( check ) {
      this.cateService.addCategory(body)
        .subscribe( resp => {
          if ( resp.category ) {
            this.setFormCate();
            Swal.fire( 'Satisfactorio', `Categoria creada`, 'success' );
          } else {
            Swal.fire( 'Error', resp.toString(), 'error' );
          }
        })
    }

  }

  // Update Product
  goToUpdate() {
    console.log('click');
    // console.log('IdProduct: ', this.idProduct);
    const { selectedProduc } = this.selectForm.value;
    this.idProduct = selectedProduc;
    this.wantToUpdate = !this.wantToUpdate;
    const oneProd = this.products.find( p => p.id === selectedProduc );
    this.nameProduct = oneProd?.name!;
  }

  getBodyFromChild( updatedData: object ) {
    // Before Update
    // console.log( this.prodServ.products );
    console.log('Receiving body');
    // console.log(updatedData);
    this.wantToUpdate = !this.wantToUpdate;
    this.selectForm.reset();
    console.log('ID: ', this.idProduct);
    console.log('Body: ', updatedData);
    this.prodServ.updateProduct( this.idProduct, updatedData )
      .subscribe( resp => {
        if ( resp.product ) {
          this.products = this.products.filter( p => p.id !== this.idProduct );
          this.products.push( resp.product );
          Swal.fire( 'Correcto',`${resp.product.name} actualizado`, 'success' )
        } else {
          Swal.fire( 'Error', resp.toString(), 'error' );
        }
        
      })
  }

  // Update Img Products
  closeForm() {
    this.wantToUpdate = !this.wantToUpdate;
    this.selectForm.reset();
  }

  // Delete Product
  deleteProduct() {
    const { product } = this.myform.value;
    if ( !product ) {
      return;
    }
    this.prodServ.deleteProduct( product )
      .subscribe( resp => {
        ( resp.product )
          ? this.products = this.products.filter( p => p.id !== product )
          : Swal.fire( 'Error', resp.toString(), 'error' );
      })
    
    this.myform.get('product')?.reset('');
    this.validDeletion = true;
    setTimeout(() => {
      this.validDeletion = false;
    }, 2800);

  }



}
