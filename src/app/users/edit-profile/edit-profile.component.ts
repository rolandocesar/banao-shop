import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ProductsService } from '../../product/products.service';

interface Data {
  name?: string;
  mobile?: string;
  password?: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent  {

  

  myform: FormGroup = this.fb.group({
    'name': [ '', [ Validators.required ] ],
    'mobile': [ '', [ Validators.required ] ],
    'password': [ '', [ Validators.required ,Validators.minLength(6) ] ],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService,
               private prodServ: ProductsService
               ) { }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  update() {
    console.log(this.myform.value);
    const { name, mobile, password } = this.myform.value;

    let data: Data = {};
    if ( name.length > 0 ) {
      data.name = name;
    }
    if ( mobile.length > 0 ) {
      data.mobile = mobile;
    }
    if ( password.length > 0 ) {
      data.password = password;
    }

    if ( !data.mobile && !data.name && !data.password ) {
      Swal.fire( 'Atentamente', 'Debe editar o actualizar algun campo antes de enviar', 'info');
    } else {

      this.authService.updateUser( data )
        .subscribe( resp => {
          ( resp.uid ) ? this.router.navigateByUrl('/user/') : Swal.fire( 'Error', resp, 'warning' );
        })
    }

  }

  comeBack() {
    this.router.navigateByUrl('/user/');
  }

  // test() {
  //   this.prodServ.changeTest();
  // }

}
