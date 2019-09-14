import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { ContactsDisplayModel, ContactModel } from '../_models/contact.model';
import { AppDataService } from '../_services/display-data.service';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { HttpResponse } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { NbFlipCardComponent, NbRevealCardComponent } from '@nebular/theme';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  public deleteMode = false;
  public phoneNumberCaption: string;
  public emailAddressCaption: string;
  public contactsData: ContactsDisplayModel[] = [];
  private handleSubscriptionEmission;
  private handelDeleteMode;
  private deleteModeToggle;
  // public cardFlipped = false;
  public toggle = false;
  public loadingProgress = 0;
  public interValInject;
  public loadMessages = 'Welcome';
  public loadingElementShow = true;
  public httpResponse: HttpResponse<any>;
  public slideOut:string;
  deleteObservable = new Subscriber<HttpResponse<any>>();
  /* CLASS CONSTRUCTOR */
  constructor(
    private uiService: AppDataService,
    private http: HttpService,
    private msgService: InterComponentCommsService
  ) {
    this.phoneNumberCaption = this.uiService.getGeneralData().phoneNumberCaption;
    this.emailAddressCaption = this.uiService.getGeneralData().emailAddressCaption;

    this.handelDeleteMode = (): void => {
      this.deleteModeToggle();
      return;
    }

    this.deleteModeToggle = (): boolean => {
      console.log("toggle delete mode");
      return this.deleteMode = !this.deleteMode;
    }

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
      this.contactsData = data.table.map(({ intId, FirstName, LastName, Phone, Email, _id }) => {
        return new ContactsDisplayModel(FirstName, LastName, Phone, Email, intId, _id)
      });
    };
  }
  /* INIT HOOK */
  ngOnInit() {
    this.http.provideAllRecords().subscribe(this.handleSubscriptionEmission);
    const thisInterval = setInterval(this.interValInject, 50);
    if (this.loadingProgress === 100) { clearInterval(thisInterval); }

    // Subscribe to broadcaster
    this.msgService.subScribeToMessages().subscribe(msg => {
      console.log(msg);
      switch (msg) {
        case "delete-contact": this.handelDeleteMode(); break;
      }
    });

    // Subscribe to added card to place in view as first card once created
    this.http.getNewContactCard().subscribe(newContact=>{
      console.log('newContact: ', newContact[0].new = true);
      this.contactsData.splice(0,0,newContact[0]);
    })
  }
  /* CLASS METHODS */

  /**
   * TODO:
   */
  onClickflipCard(): void {
    //this.cardFlipped = true;
  }

  /**
   * @description Removes card from database
   */
  onDeleteContactClick(contactId: string, index:number): void {
    console.log('index: ', index);
    console.log('contactId: ', contactId);
    const deleteObservable = this.http.deleteContact(contactId,index);
    // this.contactsData

    deleteObservable.subscribe(resp=>{
      console.log(resp.res.deletedCount);
      this.contactsData.splice(index,1);
      this.deleteMode=false;
    },err=>console.error(err))
  }

  /**
   * @description edit card
   */
  editContact(flipCard: NbFlipCardComponent ):void{
    //flipCard.flipped = true
    flipCard.flipped = true;
    console.log('flipCard: ', flipCard);


    return;
  }

  /**
   * @description save or cancel card update
   */
  updateCard(...params):void{
    console.log(params)

  }
}
