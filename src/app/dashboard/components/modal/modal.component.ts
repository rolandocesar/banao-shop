import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;
  // @Input() activateModal: any;

  constructor( public elem: ElementRef<HTMLElement>,
      private modalService: ModalService,
    ) {
    // this.elem = this.trigger;
  }

  ngOnInit(): void {
    // this.elem.nativeElement.click();
  }

  closeOpen() {
    this.modalService.emit();
  }

}
