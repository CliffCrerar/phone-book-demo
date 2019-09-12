/**
 * @name Http-service
 * @description Handles the CRUD actions of the application
 *     The backend of the application is represented by git a GIT Gist
 *     each file in the gist represents a contact.
 *
 *     This service handles the HTTP communication and data processing for
 *     - Create a new contact
 *     - Update a existing contact data
 *     - Delete a contact
 *
 * @param http http client injected to instantiate only 1 httpClient
 */

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Subscribable, Observable, Subject } from 'rxjs';
import { ContactModel, PostNewContact } from '../_models/contact.model';
import { environment as env } from 'src/environments/environment';
import { NewContact } from '../_models/new-contact-form.model';
import { UrlSerializer, UrlTree } from '@angular/router';
import { ParseError, Serializer } from '@angular/compiler';

@Inject({ providedIn: 'root' })
export class HttpService {
  /* CLASS ATTRIBUTES */
  httpGetAllSubscribable: Subscribable<{ table: ContactModel[] }>;
  httpPutNewRecord: Subscribable<any>;
  mainDataSet: ContactModel[];
  maxIdNo = 0;
  thisPostBody:ContactModel;
  newContactSubject=new Subject<PostNewContact>();


  /* CLASS CONSTRUCTOR */
  constructor(private http: HttpClient) {
    // console.log(this.tempClass)
    this.httpGetAllSubscribable =
      http.get<{ table: ContactModel[] }>(this.buildUrl('getAllRecords'), this.headerGetAllRecords());
    // Sets central main data set
    this.httpGetAllSubscribable.subscribe(data => {

      this.mainDataSet = data.table
      this.maxIdNo = data.table.length + 1
    });


    // Instantiate observable
    this.httpPutNewRecord = new Observable();

  }
  /* CLASS METHODS */
  /**
   * @description Set headers for http get all records call that runs in constructor.
   */
  headerGetAllRecords(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders()
        .append('Cache-Control', 'no-cache')
        .append('Content-Type', 'application/json')
    };
  }
  /**
   * @description Set headers for http post new contact to database.
   */
  headerPostNewContact(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders()
        .append('Cache-Control', 'no-cache')
        .append('Content-Type', 'application/json')
    };
  }
  /**
   * @description Uses environment variables and parameters to compose an request specific URL.
   */
  buildUrl(keyAttribute: string, dev: boolean = false): string {
    const host = dev ? 'dataHostDev' : 'dataHostLive';
    return env[host] + '/?lookupKey=' + env.lookupKey[keyAttribute];
  }
  /**
   * @description Subscribable type variable passed via this method to create a provider for all records request
   */
  provideAllRecords = (): Subscribable<{ table: ContactModel[] }> => this.httpGetAllSubscribable;
  /**
   * @description Method used by external components to push task to this service for processing
   */
  postNewContact(newContact: NewContact[]): Subscribable<any> {
    const PostBody = new PostNewContact(
      null,
      newContact[0].value, // ? FirstName
      newContact[1].value, // ? LastName
      newContact[3].value, // ? Email
      newContact[2].value, // ? Phone
      new Date().toLocaleString(), // ? CreatedDate
      ++this.maxIdNo // ? New user id
    );
    this.maxIdNo++
    // this.http.post<PostNewContact>(this.buildUrl('postContact'),postBody,this.headerPostNewContact());
    console.log('postBody: ', PostBody);
    // this.thisPostBody=PostBody;
    this.httpPutNewRecord =
    this.http.put<PostNewContact>(
      this.buildUrl('postContact', false),
      PostBody,
      this.headerPostNewContact())
    return this.httpPutNewRecord;
  }

  /**
 * TODO:
 */
  deleteContact(contactId: string, index: number): Subscribable<any> {
    console.log('httpDeleteContact', contactId);
    const deleteContactUrl = this.buildUrl("deleteContact", false);
    console.log('deleteContactUrl: ', deleteContactUrl);
    console.log('this.buildUrl: ', this.buildUrl);
    return this.http.delete(`${deleteContactUrl}&delete_record=${contactId}`);
  }

  /**
   * TODO: push new contacts back to components
   *
   */
  getNewContactCard():Subject<any>{
    return this.newContactSubject;
  }

  pushNewContactData(newContact: PostNewContact):void{
    return this.newContactSubject.next(newContact);
  }
}
