import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/category/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @Output() bodyForm = new EventEmitter<object>();

  myform: FormGroup = this.fb.group({
    'name': [ '', [ Validators.required ] ],
    
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  validField( field: string ) {
    return this.myform.controls[field].touched &&
            this.myform.controls[field].invalid 
  }

  passBody() {
    let body = this.myform.value;
    this.bodyForm.emit( body );
  }

}
