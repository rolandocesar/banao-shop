import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.baseUrl;
  public _user!: User;

  get userProps() {
    return { ...this._user };
  }

  get getToken() {
    return new HttpHeaders()
      .set( 'x-token', localStorage.getItem('token') || '' );
  }

  constructor(
    private http: HttpClient,

  ) { }

  login( email: string, password: string ) {

    const body = { email, password }
    
    const url = `${this._baseUrl}/auth/login`;
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.user ) {
            localStorage.setItem('token', resp.token!);
          };
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )

  };

  register(name:string, email:string, password:string, mobile: string) {

    const body = { name, email, password, mobile }
    const url = `${this._baseUrl}/auth/new`;

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.user ) {
            localStorage.setItem('token', resp.token!);
          };
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )
  };

  revalidateToken(): Observable<boolean>  {

    const url = `${this._baseUrl}/auth/renew`;
    
    

    return this.http.get<AuthResponse>( url, { headers: this.getToken } )
      .pipe(
        map( resp => {
          if ( resp.ok ) {
            localStorage.setItem( 'token', resp.token! );
            const { name, email, uid, mobile, role } = resp.user!;
            this._user = {
              name,
              mobile,
              email,
              uid,
              role
            }
          }
          return resp.ok;
        }),
        catchError( err => of(false) )
      )
  };

  updateUser( data: object ) {

    const { uid } = this._user;
    
    const url = `${this._baseUrl}/users/${uid}`;
    return this.http.put<User>( url, data, { headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.uid ) {
            this._user = {
              name: resp.name,
              uid: resp.uid,
              email: resp.email,
              mobile: resp.mobile
            }
          }
        } ),
        map( resp => resp ),
        catchError( err =>  of(err.error.msg) )
      )
  }
    
   
}
