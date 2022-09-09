import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../category/interfaces/categories.interfaces';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  @Input() cate!: Category;
  @Output() id = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  clickOverCate( event: any ) {
    const { id } = event.target;
    this.id.emit( id );
  }

}
