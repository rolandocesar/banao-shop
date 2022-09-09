import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myform: FormGroup = this.fb.group({
    'email': [ '', [ Validators.required, Validators.pattern(this.emailPattern) ] ],
    'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
  })

  constructor( private fb: FormBuilder, 
               private router: Router,
               private authService: AuthService,
               
               ) { }
  
  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  login() {
    // console.log(this.myform.value);
    // const { email, password } = this.myform.value;
    const { email, password  } = this.myform.value;
    Swal.fire( {
      title: 'Cargando...',
      text: 'Depende de la conexion',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    } );
    this.authService.login( email, password )
      .subscribe( resp => {
        if ( resp.user ) {
          console.log(resp);
          Swal.close();
          this.router.navigateByUrl('/user/');
        } else {
          Swal.close();
          Swal.fire('Error', resp , 'error' );
        }
      } )

  }

}
