import { Component, OnInit } from '@angular/core';

interface Menu {
  text: string;
  route: string;
}

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent implements OnInit {

  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setOpenClose(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenuNavbar(): void {
    this.isOpen = false;
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
