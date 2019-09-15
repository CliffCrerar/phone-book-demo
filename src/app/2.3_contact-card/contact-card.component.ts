import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { ContactsDisplayModel, ContactModel } from '../_models/contact.model';
import { AppDataService } from '../_services/display-data.service';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { HttpResponse } from '@angular/common/http';
import { Subscriber, Observable,Subscribable } from 'rxjs';
import { NbFlipCardComponent, NbRevealCardComponent, NbToastRef, NbCardComponent } from '@nebular/theme';
import { HaveSomeToastService } from '../_services/toaster.service';
import { environment } from '../../environments/environment';
import { ToastMessageModel } from '../_models/toastMessage.modal'


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
  public loadingElementShow = environment.production;
  public httpResponse: HttpResponse<any>;
  public slideOut: string;
  public deleteObservable: Subscribable<any>;
  public fNameLNameNg = 'flex:1 !important'
  public mouseOverAccent: string;
  public toastMessages = ToastMessageModel;
  private sendingUpdateToast = new ToastMessageModel(
    'Sending update',
    '',
    'info',
    'cloud-upload-outline');
  private contactUpdatedToast = new ToastMessageModel(
    'Contact Updated',
    '',
    'success',
    'checkmark-outline');
  // tslint:disable-next-line:max-line-length
  private updateErrorToast = new ToastMessageModel(
    'ERROR',
    'Attempt to save record has failed, please contact support',
    'danger',
    'wifi-off-outline',
    5000);
  private updateCancelToast = new ToastMessageModel(
    'Update was canceled',
    '',
    'warning',
    'slash-outline'
  );
  /* CLASS CONSTRUCTOR */
  constructor(
    private uiService: AppDataService,
    private http: HttpService,
    private msgService: InterComponentCommsService,
    private toasterService: HaveSomeToastService
  ) {
    console.log('environment: ');
    this.phoneNumberCaption = this.uiService.getGeneralData().phoneNumberCaption;
    this.emailAddressCaption = this.uiService.getGeneralData().emailAddressCaption;

    this.handelDeleteMode = (): void => {
      this.deleteModeToggle();
      return;
    };

    this.deleteModeToggle = (): boolean => {
      console.log('toggle delete mode');
      return this.deleteMode = !this.deleteMode;
    };

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
    this.handleSubscriptionEmission = (data):void => {
      console.log(data);
      this.contactsData = data.table.
        map(({ intId, FirstName, LastName, Phone, Email, _id }) => {
          return new ContactsDisplayModel(FirstName, LastName, Phone, Email, intId, _id);
        });
      this.msgService.broadCastMessage({subject: 'contact-data', body: data});
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
      switch (msg.subject) {
        case 'delete-contact': this.handelDeleteMode(); break;
      }
    });

    // Subscribe to added card to place in view as first card once created
    this.http.getNewContactCard().subscribe(newContact => {
      console.log('newContact: ', newContact[0].new = true);
      this.contactsData.splice(0, 0, newContact[0]);
    });
    // Subscribe to http message
    this.msgService.subscribeToFilterData().subscribe(filterData=>{
      console.log(filterData);
      this.contactsData = filterData;
    })
  }
  /* CLASS METHODS */

  /**
   * @description Removes card from database
   */
  onDeleteContactClick(contactId: string, index: number): void {
    console.log('index: ', index);
    console.log('contactId: ', contactId);
    this.toasterService.getSomeToast(new ToastMessageModel('Deleting', '', 'info', 'cloud-upload-outline'));
    this.deleteObservable = this.http.deleteContact(contactId, index);
    // this.contactsData

    this.deleteObservable.subscribe(resp => {
      console.log(resp.res.deletedCount);
      this.contactsData.splice(index, 1);
      this.toasterService.getSomeToast(new ToastMessageModel('Records was deleted', '', 'success', 'cloud-upload-outline'));
      this.deleteMode = false;
    }, err => console.error(err));
  }

  /**
   * @description edit card
   */
  editContact(flipCardRef: NbFlipCardComponent): void {
    flipCardRef.flipped = true;
    return;
  }

  /**
   * @description save or cancel card update
   */
  onSaveOrCancelClick(...params): void {
    params[0].flipped = false;
    if (params[1] === 'CANCEL') {
      this.runOnUpdateCancel(params[0]); // pass to 
    } else {
      this.postUpdate(params[1]);
    }
    return;
  }

  /**
   * @description post the update to the database
   */
  postUpdate(update: ContactModel): void {
    this.toasterService.getSomeToast(this.sendingUpdateToast);
    this.http.postToDataBase(update).subscribe(resp => {
      this.toasterService.getSomeToast(this.contactUpdatedToast);
      console.log(resp);
    }, err => {
      console.error(err);
      // tslint:disable-next-line:max-line-length
      this.toasterService.getSomeToast(this.updateErrorToast);
    });
  }

  /**
   * @description Cancel card update action
   */
  runOnUpdateCancel(flipCardRef: NbFlipCardComponent) {
    flipCardRef.flipped = false;
    this.toasterService.getSomeToast(this.updateCancelToast);
    return;
  }
}
