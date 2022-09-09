import { Component, OnInit } from '@angular/core';
import { ProductsService } from './product/products.service';
import { CategoriesService } from './category/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopApp';

  constructor( private prodServ: ProductsService, private cateServ: CategoriesService ) {
    this.prodServ.loadAllProducts().subscribe();
    this.cateServ.loadAllCategories().subscribe();
    console.log('App Component');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
