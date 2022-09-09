import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor ( private authServ: AuthService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      
      return this.authServ.revalidateToken()
        .pipe(
          tap( condition => {
            
            if ( !condition ) {
              this.router.navigateByUrl('/auth/login');
            }
          } )
        )

      // return true;

  };

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {
      
      return this.authServ.revalidateToken()
        .pipe(
          tap( condition => {
            
            if ( !condition ) {
              this.router.navigateByUrl('/auth/login');
            }
          } )
        )

      // return true;

  };
};
