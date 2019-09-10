import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { ContactsDisplayModel, ContactModel } from '../_models/contact.model';
import { AppDataService } from '../_services/display-data.service';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  public phoneNumberCaption: string;
  public emailAddressCaption: string;
  public contactsData: ContactsDisplayModel[];
  private handleSubscriptionEmission;
  public cardFlipped = false;
  public toggle = false;
  /* CLASS CONSTRUCTOR */
  constructor(
    private uiService: AppDataService,
    private http: HttpService,
    private msgService: InterComponentCommsService
  ) {
    this.phoneNumberCaption = this.uiService.getGeneralData().phoneNumberCaption;
    this.emailAddressCaption = this.uiService.getGeneralData().emailAddressCaption;
    this.handleSubscriptionEmission = data => this.contactsData =
      data.table.map(({ intId, FirstName, LastName, Phone, Email, _id }) =>
        new ContactsDisplayModel(FirstName, LastName, Phone, Email, intId, _id));
  }
  /* INIT HOOK */
  ngOnInit() {
    this.http.provideAllRecords().subscribe(this.handleSubscriptionEmission);
    // this.msgService.subScribeToNewContacts().subscribe(this.appendInsertedRecord);
    return;
  }

  /* CLASS METHODS */
  /**
   * TODO:
   */
  // appendInsertedRecord(newContact: ContactModel): void {
    // this.contactsData.push(newContact.opt[0]);
  // }

  /**
   * TODO:
   */
  onClickflipCard():void {
    this.cardFlipped = true;
  }
}
