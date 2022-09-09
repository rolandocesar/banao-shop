import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllProds, Product, SingleProduct, Search, Result } from './interfaces/product-interfaces';
import { Upload } from './interfaces/upload-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _baseUrl = environment.baseUrl;
  private allProducts: Product[] = [];

  // Search
  private foundProducts!: Result[];

  // Proving subject
  // test: boolean = false;
  // testChange: Subject<boolean> = new Subject<boolean>();

  // get valueBoolean() {
  //   return this.test;
  // }

  get products() {  // Return all products
    return [...this.allProducts];
  }

  public get getToken() {
    return new HttpHeaders()
      .set( 'x-token', localStorage.getItem('token') || '' );
  }

  // Search
  public get getSearch() {
    return this.foundProducts || [];
  }

  constructor( private http: HttpClient ) {}

  // Init
  initProds(): Observable<AllProds> {
    const url = `${this._baseUrl}/products/`;
    return this.http.get<AllProds>( url );
  }

  // Load All Prods From DB 
  loadAllProducts(): Observable<AllProds> {
    const url = `${this._baseUrl}/products/`;
    Swal.fire( {
      title: 'Cargando...',
      text: 'Depende de la conexion',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    } );
    return this.http.get<AllProds>( url )
      .pipe(
        tap( resp => {
          console.log('Products: ',resp);
          if ( resp.total > 0 ) {
            resp.products.forEach( p => {
              this.allProducts.push( p );
            } )
          }
          Swal.close();
        } )
      )

  }

  // Create Product
  createProduct( body: object ): Observable<SingleProduct> {

    const url = `${this._baseUrl}/products/new`;
    return this.http.post<SingleProduct>( url, body ,{ headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.product ) {
            this.allProducts.push( resp.product );
          }
        }),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )
  }

  // Delete Product By Id
  deleteProduct( id: string ): Observable<SingleProduct> {
    const url = `${this._baseUrl}/products/${id}`;
    return this.http.delete<SingleProduct>( url ,{ headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.product ) {
            this.allProducts = this.allProducts.filter( p => p.id !== id );
          }
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )
  }

  // Update Product By Id
  updateProduct( id: string, body: object ): Observable<SingleProduct> {
    const url = `${this._baseUrl}/products/${id}`;
    return this.http.put<SingleProduct>( url , body, { headers: this.getToken } )
      .pipe(
        tap( resp => {
          if ( resp.product ) {
            this.allProducts.forEach( (p, index) => {
              if ( p.id === id ) {
                this.allProducts.splice(index,1);
                this.allProducts.push(resp.product);
              }
            } );
          }
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )
  }

  // Search Product
  searchProduct( terminus: string ): Observable<Search> {
    const url = `${this._baseUrl}/search/products/${terminus}`;
    return this.http.get<Search>( url )
      .pipe(
        tap( resp => {
          if ( resp.results.length > 0 ) {
            this.foundProducts = resp.results;
            console.log('Found Products: ', this.foundProducts);
            localStorage.setItem('search', JSON.stringify( resp.results ));
          }
        }),
        map( resp => resp),
        catchError( err => of(err.error.msg) )
      )
  }

  // Upload Images
  uploadImages( id: string, file: FileList ): Observable<Upload> {
    const url = `${this._baseUrl}/upload/products/${id}`;
    const formData: FormData = new FormData();
    for ( let i = 0; i < 3; i ++ ) {
      if ( file[i] ) {
        formData.append( `file${i + 1}`, file[i] );
      }
    }
    return this.http.post<Upload>( url, formData, { headers: this.getToken } )
      .pipe(
        // tap( resp => {
        //   console.log('From the Tap in Service : ',resp);
        // } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      )
  }

}
