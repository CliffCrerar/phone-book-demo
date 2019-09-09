import { Component, OnInit } from '@angular/core';
import { NewContact } from '../_models/new-contact-form.model';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  display = true;
  formDefinition: NewContact[] = [];
  /* CLASS CONSTRUCTOR */
  constructor(private msgService: InterComponentCommsService) {
    this.addInput('FirstName', 'First Name');
    this.addInput('LastName', 'Last Name');
    this.addInput('Phone', 'Phone Number');
    this.addInput('Email', 'Email Address');
  }
  /* ON INIT HOOK */
  ngOnInit() {
  }
  /* CLASS METHODS */

  /**
   * @description build the data that creates the new contact form
   */
  addInput(name: string, placeholder: string, value: string = null): void {
    this.formDefinition.push(new NewContact(name, placeholder));
    return;
  }

}
