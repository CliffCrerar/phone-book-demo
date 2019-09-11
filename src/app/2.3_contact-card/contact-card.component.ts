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
  public contactsData: ContactsDisplayModel[] = [];
  private handleSubscriptionEmission;
  public cardFlipped = false;
  public toggle = false;
  public loadingProgress = 0;
  public interValInject;
  public loadMessages = 'Welcome';
  public loadingElementShow = true;

  /* CLASS CONSTRUCTOR */
  constructor(
    private uiService: AppDataService,
    private http: HttpService,
    private msgService: InterComponentCommsService
  ) {
    this.phoneNumberCaption = this.uiService.getGeneralData().phoneNumberCaption;
    this.emailAddressCaption = this.uiService.getGeneralData().emailAddressCaption;

    this.interValInject = (): void => {
      this.loadingProgress++;
      // tslint:disable-next-line:no-unused-expression
      // tslint:disable-next-line:no-unused-expression
      (function () {
        switch (this.loadingProgress) {
          case 0: this.loadMessages = 'Welcome!'; break;
          case 10: this.loadMessages = 'Making Http request'; break;
          case 20: this.loadMessages = 'Getting data'; break;
          case 80: this.loadMessages = 'Getting Things ready'; break;
          case 95: this.loadMessages = 'Done'; break;
          case 100: this.loadingElementShow = false; break;
        }
      }).call(this);

    };
    this.handleSubscriptionEmission = data => {
      console.log(data);
      this.contactsData = data.table.map(({ intId, FirstName, LastName, Phone, Email, _id })=>{
        return new ContactsDisplayModel(FirstName, LastName, Phone, Email, intId, _id)});
      // this.contactCardPromises = data.table.map( ({ intId, FirstName, LastName, Phone, Email, _id })
        // return
        // new Promise(function (resolve, reject) {
          // setTimeout(() => {
            // resolve(
              // new ContactsDisplayModel(FirstName, LastName, Phone, Email, intId, _id)
            // );
          // }, 100);
        // });
      // });

    };

  }
  /* INIT HOOK */
  ngOnInit() {
    this.http.provideAllRecords().subscribe(this.handleSubscriptionEmission);
    const thisInterval = setInterval(this.interValInject, 50);
    if (this.loadingProgress === 100) { clearInterval(thisInterval); }


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
  onClickflipCard(): void {
    this.cardFlipped = true;
  }

}


// this.msgService.subScribeToNewCtontacts().subscribe(this.appendInsertedRecord);
// return;

