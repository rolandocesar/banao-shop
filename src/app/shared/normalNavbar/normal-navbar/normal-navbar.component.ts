import { Component, OnInit } from '@angular/core';


interface Menu {
  text: string;
  route: string;
}

@Component({
  selector: 'app-normal-navbar',
  templateUrl: './normal-navbar.component.html',
  styleUrls: ['./normal-navbar.component.css']
})
export class NormalNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  menuItem: Menu[] = [
    {
      text: 'Home',
      route: '/dashboard/home'
    },
    {
      text: 'Categories',
      route: '/dashboard/categories'
    },
    {
      text: 'Login',
      route: '/auth/login'
    },
    {
      text: 'Register',
      route: '/auth/register'
    },
    {
      text: 'My Profile',
      route: '/user/profile'
    },
  ]

}
