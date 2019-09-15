/**
 * @name Inter-Component-Communication-service
 * @description via passing observables around
 */
import { Subject } from 'rxjs';
import { Inject } from '@angular/core';
import { ContactModel, ContactsDisplayModel } from '../_models/contact.model';

class InterAppMessage {
  constructor(
    public subject: string,
    public body?: any
  ) { }
}

@Inject({
  providedIn: 'root'
})
export class InterComponentCommsService {
  /* CLASS METHODS */
  subjectObservable: Subject<InterAppMessage>;
  insertNewEntrySubject: Subject<ContactModel>;
  filterDataSubject: Subject<ContactsDisplayModel[]>;
  /* CLASS CONSTRUCTOR */
  constructor() {
    this.subjectObservable = new Subject<InterAppMessage>();
    this.insertNewEntrySubject = new Subject<ContactModel>();
    this.filterDataSubject = new Subject<ContactsDisplayModel[]>();
  }
  /* CLASS METHODS */
  // MAIN MENU MESSAGES
  broadCastMessage(message: InterAppMessage): void {
    this.subjectObservable.next(message);
  }

  /**
   * TODO:
   */
  subScribeToMessages(): Subject<InterAppMessage> {
    return this.subjectObservable;
  }

  /**
   * TODO:
   */
  subScribeToNewContacts(): Subject<ContactModel> {
    return this.insertNewEntrySubject;
  }

  /**
   * @ filter data
   */
  emitFilterData(FilteredData: ContactsDisplayModel[]): void {
    this.filterDataSubject.next(FilteredData);
  }

  /**
   * @description
   */
  subscribeToFilterData(): Subject<ContactsDisplayModel[]> {
    return this.filterDataSubject;
  }
}
