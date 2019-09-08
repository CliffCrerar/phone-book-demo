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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Subscribable } from 'rxjs';
import { ContactModel } from '../_models/contact.model';
import { environment as env } from 'src/environments/environment';

@Inject({ providedIn: 'root' })
export class HttpService {
    /* CLASS ATTRIBUTES */
    httpGetAllSubscribable: Subscribable<{table:ContactModel[]}>;

    constructor(private http: HttpClient) {
        //console.log(this.tempClass)        
        this.httpGetAllSubscribable = 
            http.get<{table: ContactModel[]}>(this.buildUrl('allRecords'), this.headerGetAllRecords());
        //this.httpGetAllSubscribable.subscribe(data => console.log(data), err => console.log(err));
    }

    /* CLASS METHODS */
    /**
     * @name headerGetAllRecord
     * @description Set headers for http get all records call that runs in contstructor.
     */
    headerGetAllRecords(): { headers: HttpHeaders } {
        return { headers: new HttpHeaders()
            .append('Cache-Control', 'no-cache')
            .append('Content-Type', "application/json") };
    }

    /**
     * @name buildUrl
     * @description Uses environment variables and parameters to compose an request specific URL.
     * @param keyAttribute the call to express server has a unique key that determines the parameters
     * that are passed to the mongoDB data source
     */
    buildUrl(keyAttribute: string): string {
        return env.dataHost + "/?lookupKey=" + env.lookupKey[keyAttribute];
    }

    /**
     * @name provideAllRecords
     * @description Subscribable type variable passed via this method to create a provider for all records request
     */
    provideAllRecords = (): Subscribable<{table:ContactModel[]}> => this.httpGetAllSubscribable;
}