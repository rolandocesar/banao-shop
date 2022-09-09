import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Category, RespAddCate, RespAllCate, SearchCategory } from './interfaces/categories.interfaces';
import { AllProds } from '../product/interfaces/product-interfaces';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _baseUrl = environment.baseUrl;
  private _categs: Category[] = [];

  get getToken() {
    return new HttpHeaders()
      .set( 'x-token', localStorage.getItem('token') || '' );
  }

  get getCategories() {
    return this._categs;
  }

  constructor( private http: HttpClient ) { }

  // Init Categories

  initCategories(): Observable<RespAllCate> {
    const url = `${this._baseUrl}/categories/`;
    return this.http.get<RespAllCate>( url );
  }

  loadAllCategories(): Observable<RespAllCate> {
    const url = `${this._baseUrl}/categories/`;
    return this.http.get<RespAllCate>( url )
      .pipe(
        tap( resp => {
          if ( resp.total ) {
            resp.categories.forEach( cate => this._categs.push( cate ));
          }
        } )
      )
  }

  addCategory( body: object ): Observable<RespAddCate> {
    const url = `${this._baseUrl}/categories/`;
    return this.http.post<RespAddCate>( url, body, { headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.category ) {
            this._categs.push( resp.category );
          }
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg))
      )

  }

  getAllProdsBelongCate( id: string ): Observable<AllProds> {
    const url = `${this._baseUrl}/products/perCate/${id}`;
    return this.http.get<AllProds>( url )
      .pipe(
        map( resp => resp),
        catchError( err => of(err.error.msg) )
      )

  }

  // Search categories by Input Terminus
  searchCategoriesByTerminus( terminus: string ): Observable<SearchCategory> {
    const url = `${this._baseUrl}/search/categories/${terminus}`;
    return this.http.get<SearchCategory>(url)
      .pipe(
        map( resp => resp),
        catchError( err => of(err.error.msg))
      )
  }

}
