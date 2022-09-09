import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../auth/interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private _baseUrl = environment.baseUrl;

  constructor( private authService: AuthService,
               private http: HttpClient
    ) { }

  

}
