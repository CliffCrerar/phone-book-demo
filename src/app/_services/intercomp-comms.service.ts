/**
 * @name Inter-Component-Communication-service
 * @description via passing observables around
 */
import { Subject } from 'rxjs';
import { Inject } from '@angular/core';
import { ContactModel } from '../_models/contact.model';

@Inject({
  providedIn: 'root'
})
export class InterComponentCommsService {
  /* CLASS METHODS */
  subjectObservable: Subject<any>;
  insertNewEntrySubject: Subject<ContactModel>;
  /* CLASS CONSTRUCTOR */
  constructor() {
    this.subjectObservable = new Subject<any>();
    this.insertNewEntrySubject = new Subject<ContactModel>();
  }
  /* CLASS METHODS */
  // MAIN MENU MESSAGES
  broadCastMessage(message: any): void {
    this.subjectObservable.next(message);
  }

  /**
   * TODO:
   */
  subScribeToMessages(): Subject<string> {
    return this.subjectObservable;
  }

  /**
   * TODO:
   */
  // updateAfterInsert(newContact: ContactModel): Subject<ContactModel> {
  //   this.subjectObservable.next();
  // }

  /**
   * TODO:
   */
  subScribeToNewContacts(): Subject<ContactModel> {
    return this.insertNewEntrySubject;
  }
}
