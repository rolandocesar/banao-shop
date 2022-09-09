import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from 'src/app/product/products.service';
import Swal from 'sweetalert2';

interface Body {
  name?: string;
  price?: string;
  desc?: string;
  amount?: string;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  // Upload Imgs
  @Input() wantToUpdate!: boolean;
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLElement>;
  amountImg: number = 0;
  showForm: boolean = true;
  files!: FileList;
  @Output() closeForm = new EventEmitter<void>();

  @Output() updatedData = new EventEmitter<object>();
  @Input() id!: string;
  @Input() nameProductToUpdate!: string;
  message: boolean = false;

  // myform: FormControl = this.fb.control(['', [ ] ])

  updateForm: FormGroup = this.fb.group({
    'name': [ '', [  ] ],
    'price': [ '', [  ] ],
    'desc': [ '', [  ] ],
    'amount': [ '', [ Validators.min(1) ] ],
  })

  constructor( 
              // private router: Router,
              private prodServ: ProductsService,
              private elem: ElementRef<HTMLElement>,
              private fb: FormBuilder,
  ) {
    this.inputFile = elem;
  }

  ngOnInit(): void {  
  }

  updateProd() {
    const { name, price, desc, amount } = this.updateForm.value;
    let body: Body = {};
    if ( name ) {
      body!.name = name;
    }
    if ( price ) {
      body!.price = price;
    }
    if ( desc ) {
      body!.desc = desc;
    }
    if ( amount ) {
      body!.amount = amount;
    }
    if ( !body.name && !body.price && !body.amount && !body.desc ) {
      this.message = !this.message;
      setTimeout(() => {
        this.message = !this.message;
      }, 1500);
      return;
    }
    this.updatedData.emit( body );
    this.updateForm.reset();
  }

  // Uploading Img
  clickIcon() {
    this.inputFile.nativeElement.click();
    // this.selectedPhotos();
  }
  
  addPhotos(e: any) {
    console.log('heree');
    const file = e.target.files;
    
    if ( file ) {
      this.amountImg = file.length;
      this.files = file;
    }
    this.showForm = !this.showForm;
  }

  cancel() {
    this.showForm = !this.showForm;
  }

  uploadImg() {
    // console.log('Files To Upload: ', this.files);
    this.prodServ.uploadImages( this.id, this.files )
      .subscribe( resp => {
        if ( resp.model ) {
          // console.log('All was uploaded');
          this.closeForm.emit();
          Swal.fire('Subida Exitosa', 'La/las fotos fueron subidas correctamente', 'success');
        } else {
          Swal.fire( 'Error', resp.toString(), 'error' );
        }
      })
  }


}
