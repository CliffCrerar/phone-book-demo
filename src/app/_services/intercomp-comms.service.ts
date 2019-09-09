/**
 * @name Inter-Component-Communication-service
 * @description via passing observables around
 */
import { Subject } from 'rxjs';
import { Inject } from '@angular/core';

@Inject({
    providedIn: 'root'
})
export class InterComponentCommsService {
     /* CLASS METHODS */
     subjectObservable: Subject<any>;
     /* CLASS CONSTRUCTOR */
     constructor(){
        this.subjectObservable = new Subject<any>();
     }
     /* CLASS METHODS */
     broadCastMessage(message: any):void {
         this.subjectObservable.next(message);
     }

    subScribeToMessages(){
        return this.subjectObservable;
    }
 }