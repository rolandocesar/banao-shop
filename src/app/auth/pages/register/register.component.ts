import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myform: FormGroup = this.fb.group({
    'name': [ '', [ Validators.required ] ],
    'mobile': [ '', [ Validators.required, Validators.minLength(8) ] ],
    'email': [ '', [ Validators.required, Validators.pattern(this.emailPattern) ] ],
    'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService
               ) { }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  register() {
    
    const { name, email, password, mobile } = this.myform.value;
    Swal.fire( {
      title: 'Cargando...',
      text: 'Depende de la conexion',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    } );
    this.authService.register( name, email, password, mobile )
      .subscribe( resp => {
        if ( resp.user ) {
          Swal.close();
          this.router.navigateByUrl('/user/profile');
        } else {
          Swal.close();
          Swal.fire( 'Error', resp, 'error' );
        }
      } )

  }


}
