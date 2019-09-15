import { Component, OnInit } from '@angular/core';
import { NewContact } from '../_models/new-contact-form.model';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { HttpService } from '../_services/http.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Unsubscribable, PartialObserver, Subscriber,Subscribable, Observable } from 'rxjs';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  display = false;
  formDefinition: NewContact[] = [];
  postNewContactObservable
  slideOut;
//  Dev variables
  fn = 'Cliff';
  ls = 'Crerar';
  ph = '131-231-2312';
  em = 'cliff@cliff.cliff';
  /* CLASS CONSTRUCTOR */
  constructor(private msgService: InterComponentCommsService, private httpService: HttpService) {
    this.addInput('FirstName', 'First Name', this.fn);
    this.addInput('LastName', 'Last Name', this.ls);
    this.addInput('Phone', 'Phone Number', this.ph);
    this.addInput('Email', 'Email Address', this.em);

      // this.addInput('FirstName', 'First Name');
      // this.addInput('LastName', 'Last Name');
      // this.addInput('Phone', 'Phone Number');
      // this.addInput('Email', 'Email Address');
  }
  /* ON INIT HOOK */
  ngOnInit() {
    // Listen for broadcasted messages
    this.msgService.subScribeToMessages().subscribe(msg => {
      switch (msg.subject) {
        case 'add-contact': this.toggleAddContactForm();
      }
    });
  }
  /* CLASS METHODS */

  /**
   * @description slides new contact form into user view
   */
  toggleAddContactForm() {
    console.log('Toggle Add Contact');
    this.display = true;
  }

  /**
   * @description build the data that creates the new contact form
   */
  addInput(name: string, placeholder: string, value: string = null): void {
    this.formDefinition.push(new NewContact(name, placeholder, value));
    return;
  }

  /**
   * @description Click event to post contact to server and save in database
   */
  postContact() {
    console.log(this.formDefinition);
    this.httpService.postNewContact(this.formDefinition)
      .subscribe(
        response => this.handleInsertResponse(response),
        respError => this.handleInsertContactError(respError) );
    // return;
  }

  /**
   * @description handles the server response if successful
   */
  handleInsertResponse(response: any): void {
    //TODO:
    // return response.opt[0];

    console.log(response.res.ops.new=true);
    this.httpService.pushNewContactData(response.res.ops)
  }


  /**
   * @description handles if error is returned from respose
   */
  handleInsertContactError(error: HttpErrorResponse):void{
    console.error('error: ', error);
    // TODO:
    return;
  }

  /**
   * @description when the cancel contact form is clicked
   * TODO: slide out form like it slides in
   */
  cancelNewContact(): void {
    this.slideOut = 'slideOutLeft'
    setTimeout(() => {
      this.display = false;
      this.slideOut = ''
    }, 2000);

    return;
  }

  /**
   * @description validates input on leave
   * TODO:
   */
  checkInput(index: number, inputInstance: NewContact, event: EventTarget): void {
    console.log('index: ', index);
    console.log('event: ', event);
    console.log('Change');

    return;
  }

  /**
   * @description Run on key press format for specified fields like phone number
   * TODO:
   */
  onKeyformat(inputInstance: NewContact, index: number): void {

    return;
  }
}
