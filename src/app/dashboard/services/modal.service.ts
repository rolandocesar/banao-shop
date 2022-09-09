import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  condition: boolean = false;
  subject = new BehaviorSubject<boolean>(this.condition);
  subjectChange = this.subject.asObservable();

  constructor() { }

  emit() {
    this.subject.next( !this.condition );
    this.condition = !this.condition;
  }


}
